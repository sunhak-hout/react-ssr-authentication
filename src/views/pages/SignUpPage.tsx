import { createStyles, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import SignUpForm, { SignUpData } from '../components/SignUpForm';
import { PostRequestResult, useRequest } from '../contexts/useRequest';

const SignUpPage: React.FC = () => {
  const [signUpError, setSignUpError] = useState<PostRequestResult['error']>();
  const [, setCookie] = useCookies(['token']);
  const { postRequest } = useRequest();
  const history = useHistory();

  const onSubmitSignUp = async (data: SignUpData) => {
    const result = await postRequest({ url: 'signup', data });
    setSignUpError(result.error);
    if (result.data?.token) {
      setCookie('token', result.data.token);
      history.push('/')
    }
  };

  const c = useStyles();
  return (
    <div className={c.container}>
      <SignUpForm onSubmit={onSubmitSignUp} error={signUpError} />
    </div>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      width: '100vw',
      height: '90vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  }),
);

export default SignUpPage;
