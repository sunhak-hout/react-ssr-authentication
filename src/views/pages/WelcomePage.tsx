import { Box, Button, createStyles, makeStyles, Typography } from '@material-ui/core';
import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import welcomeSVG from '../../../public/undraw_welcome_cats_thqn.svg';
import { useAuth } from '../contexts/useAuth';
import LayoutCenter from '../layouts/LayoutCenter';

const WelcomePage: React.FC = () => {
  const { user } = useAuth();

  useEffect(() => {
    document.title = `Welcome, ${user.firstName} ${user.lastName}`;
  });

  const c = useStyles();
  return (
    <LayoutCenter>
      <Box textAlign="center">
        <img src={`/${welcomeSVG}`} className={c.welcomeSVG} />
        <Typography variant="h5" gutterBottom>
          Welcome, {user?.firstName} {user?.lastName}!
        </Typography>
        <Typography gutterBottom>You've successfully logged in to the system.</Typography>
        <Link to="/logout" style={{ textDecoration: 'none' }}>
          <Button color="primary">Log out</Button>
        </Link>
      </Box>
    </LayoutCenter>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    welcomeSVG: {
      width: 520,
      maxWidth: '70%',
      marginBottom: 24,
    },
  }),
);

export default WelcomePage;
