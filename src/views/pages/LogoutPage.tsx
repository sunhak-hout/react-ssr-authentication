import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PageLoader from '../components/PageLoader';
import { useAuth } from '../contexts/useAuth';

const LogoutPage: React.FC = () => {
  const { clearCookies } = useAuth();
  const history = useHistory();

  useEffect(() => {
    clearCookies();
    history.push('/login');
  }, []);

  return <PageLoader />;
};

export default LogoutPage;
