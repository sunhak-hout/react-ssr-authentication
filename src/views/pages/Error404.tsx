import { Box, Button, createStyles, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import error404SVG from '../../../public/undraw_page_not_found_su7k.svg';
import LayoutCenter from '../layouts/LayoutCenter';

const Error404: React.FC = () => {
  useEffect(() => {
    document.title = '404 - Page not found';
  });

  const c = useStyles();
  return (
    <LayoutCenter>
      <Box textAlign="center">
        <img src={`/${error404SVG}`} className={c.svg} />
        <Typography variant="h5" gutterBottom>
          Page not found!
        </Typography>
        <Typography gutterBottom>Please make sure the URL is correct.</Typography>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Button color="primary">Back to home page</Button>
        </Link>
      </Box>
    </LayoutCenter>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    svg: {
      width: 520,
      maxWidth: '70%',
      marginBottom: 24,
    },
  }),
);

export default Error404;
