import { createStyles, makeStyles } from '@material-ui/core';
import React from 'react';

const LayoutCenter: React.FC = ({ children }) => {
  const c = useStyles();
  return <div className={c.container} children={children} />;
};

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      width: '100vw',
      minHeight: '90vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      [theme.breakpoints.down('sm')]: { minHeight: '80vh' },
    },
  }),
);

export default LayoutCenter;
