import React, { Fragment, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';

const LogoutPage: React.FC = () => {
  const { clearCookies } = useAuth();
  const history = useHistory();

  useEffect(() => {
    clearCookies();
    history.push('/login');
  }, []);

  return <Fragment />;
};

export default LogoutPage;
