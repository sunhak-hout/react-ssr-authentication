import { createStyles, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import SignUpForm, { SignUpData } from '../components/SignUpForm';
import { PostRequestResult, useRequest } from '../contexts/useRequest';
import LayoutCenter from '../layouts/LayoutCenter';

const SignUpPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Sign Up Page';
  }, []);

  const [signUpLoading, setSignUpLoading] = useState(false);
  const [signUpError, setSignUpError] = useState<PostRequestResult['error']>();
  const [, setCookie] = useCookies(['token']);
  const { postRequest } = useRequest();
  const history = useHistory();

  const onSubmitSignUp = async (data: SignUpData) => {
    setSignUpLoading(true);

    const result = await postRequest({ url: 'signup', data });
    setSignUpError(result.error);
    setSignUpLoading(false);

    if (result.data?.token) {
      setCookie('token', result.data.token);
      history.push('/');
    }
  };

  return (
    <LayoutCenter>
      <SignUpForm onSubmit={onSubmitSignUp} error={signUpError} loading={signUpLoading} />
    </LayoutCenter>
  );
};

export default SignUpPage;
