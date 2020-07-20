import { Avatar, Box, Button, createStyles, makeStyles, Typography } from '@material-ui/core';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';

const WelcomePage: React.FC = () => {
  const { user } = useAuth();
  const c = useStyles();
  return (
    <Fragment>
      <div className={c.container}>
        <Box textAlign="center" mb={3}>
          <Avatar variant="circle" className={c.avatar} src="https://bit.ly/2UxBGcC" />
          <Typography variant="h5" gutterBottom>
            Welcome, {user?.firstName} {user?.lastName}!
          </Typography>
          <Typography gutterBottom>
            You've successfully logged in to the system.
            <Link to="/logout"> Log out? </Link>
          </Typography>
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
    buttonLogOut: {
      marginTop: 24,
    },
    avatar: {
      width: 84,
      height: 84,
      margin: 'auto',
      marginBottom: 20,
    },
  }),
);

export default WelcomePage;
