import { Button, ButtonProps, CircularProgress, createStyles, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';

interface Props extends ButtonProps {
  loading?: boolean;
}

const AppButton: React.FC<Props> = ({ loading, children, ...props }) => {
  // Disable action when Button is loading
  props.onClick = loading ? undefined : props.onClick;
  props.type = loading ? 'button' : props.type;

  const c = useStyles({});

  const renderLoading = (
    <div className={c.loader}>
      <CircularProgress size={18} color="inherit" />
    </div>
  );

  return (
    <Button {...props}>
      {loading && renderLoading}
      <span className={clsx({ [c.hidden]: loading })}>{children}</span>
    </Button>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    loader: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    hidden: { opacity: 0 },
  }),
);

export default AppButton;
