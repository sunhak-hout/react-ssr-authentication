import { Box, createStyles, makeStyles, Typography } from '@material-ui/core';
import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import welcomeSVG from '../../../public/undraw_welcome_cats_thqn.svg';
import { useAuth } from '../contexts/useAuth';

const WelcomePage: React.FC = () => {
  const { user } = useAuth();

  useEffect(() => {
    document.title = `Welcome, ${user.firstName} ${user.lastName}`;
  });

  const c = useStyles();
  return (
    <Fragment>
      <div className={c.container}>
        <Box textAlign="center" mb={3}>
          <img src={`/${welcomeSVG}`} className={c.welcomeSVG} />
          <Typography variant="h5" gutterBottom>
            Welcome, {user?.firstName} {user?.lastName}!
          </Typography>
          <Typography gutterBottom>You've successfully logged in to the system.</Typography>
          <Link to="/logout" style={{ textDecoration: 'none' }}>
            <Typography color="primary" component="span">
              Log out?
            </Typography>
          </Link>
        </Box>
      </div>
    </Fragment>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      marginTop: 200,
    },
    welcomeSVG: {
      maxWidth: 400,
      width: '70%',
      marginBottom: 12,
    },
  }),
);

export default WelcomePage;
