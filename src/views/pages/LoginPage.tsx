import { createStyles, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import LoginForm, { LoginData } from '../components/LoginForm';
import { PostRequestResult, useRequest } from '../contexts/useRequest';

const LoginPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Login Page';
  }, []);

  const { postRequest } = useRequest();
  const history = useHistory();

  const [, setCookie] = useCookies(['token']);
  const [loginError, setLoginError] = useState<PostRequestResult['error']>();
  const [loginLoading, setLoginLoading] = useState(false);

  const onSubmitLogin = async (data: LoginData) => {
    setLoginLoading(true);

    const result = await postRequest({ url: 'login', data });
    setLoginError(result.error);
    setLoginLoading(false);

    if (result.data?.token) {
      setCookie('token', result.data.token);
      history.push('/');
    }
  };

  const c = useStyles({});
  return (
    <div className={c.container}>
      <LoginForm onSubmit={onSubmitLogin} error={loginError} loading={loginLoading} />
    </div>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      width: '100vw',
      minHeight: '90vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  }),
);

export default LoginPage;
