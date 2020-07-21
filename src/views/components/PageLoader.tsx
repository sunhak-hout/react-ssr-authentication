import { Box, CircularProgress, Typography } from '@material-ui/core';
import React from 'react';

const PageLoader: React.FC = () => {
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      display="flex"
      justifyContent="center"
      alignItems="center"
      zIndex={999}
    >
      <Typography component="span" color="textSecondary">
        <CircularProgress color="inherit" />
      </Typography>
    </Box>
  );
};

export default PageLoader;
