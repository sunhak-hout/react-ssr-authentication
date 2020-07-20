import { createStyles, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import LoginForm, { LoginData } from '../components/LoginForm';
import { PostRequestResult, useRequest } from '../contexts/useRequest';

const LoginPage: React.FC = () => {
  const { postRequest } = useRequest();
  const history = useHistory();

  const [, setCookie] = useCookies(['token']);
  const [loginError, setLoginError] = useState<PostRequestResult['error']>();

  const onSubmitLogin = async (data: LoginData) => {
    const result = await postRequest({ url: 'login', data });
    setLoginError(result.error);

    if (result.data?.token) {
      setCookie('token', result.data.token);
      history.push('/');
    }
  };

  const c = useStyles({});
  return (
    <div className={c.container}>
      <LoginForm onSubmit={onSubmitLogin} error={loginError} />
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
