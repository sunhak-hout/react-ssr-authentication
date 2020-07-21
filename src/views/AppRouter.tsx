import React, { Fragment, useEffect, useState } from 'react';
import { Redirect, Route, RouteProps, Switch } from 'react-router-dom';
import PageLoader from './components/PageLoader';
import { useAuth } from './contexts/useAuth';
import Error404 from './pages/Error404';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';
import SignUpPage from './pages/SignUpPage';
import WelcomePage from './pages/WelcomePage';

const AppRouter: React.FC = () => {
  return (
    <Fragment>
      <Switch>
        <AuthRoute exact path="/" component={WelcomePage} />
        <GuestRoute exact path="/login" component={LoginPage} />
        <GuestRoute exact path="/login/2" component={LoginPage} />
        <GuestRoute exact path="/signup" component={SignUpPage} />
        <Route exact path="/logout" component={LogoutPage} />
        <Route exact component={Error404} />
      </Switch>
    </Fragment>
  );
};

const GuestRoute: React.FC<RouteProps> = (props) => {
  const { user } = useAuth();
  const isAuth = Boolean(user);
  return isAuth ? <Redirect to={{ pathname: '/' }} /> : <Route {...props} />;
};

const AuthRoute: React.FC<RouteProps> = (props) => {
  const [isReady, setIsReady] = useState(false);
  const { user, authorize } = useAuth();
  const isAuth = Boolean(user);

  useEffect(() => {
    authorizeUser();
  }, []);

  const authorizeUser = async () => {
    await authorize();
    setIsReady(true);
  };

  if (!isReady) return <PageLoader />;
  return isAuth ? <Route {...props} /> : <Redirect to={{ pathname: '/login' }} />;
};

export default AppRouter;
