import {
  Box,
  Button,
  createStyles,
  Grid,
  IconButton,
  InputAdornment,
  makeStyles,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import PasswordVisibilityIcon from '@material-ui/icons/VisibilityOffOutlined';
import Alert from '@material-ui/lab/Alert';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import reactSVG from '../../../public/icons8-react.svg';
import { PostRequestResult } from '../contexts/useRequest';
import AppButton from './AppButton';

export interface LoginData {
  email: string;
  password: string;
}

interface Props {
  onSubmit: (data: LoginData) => void;
  error: PostRequestResult['error'];
  loading: boolean;
}

const LoginForm: React.FC<Props> = ({ onSubmit, error, loading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const onClickVisibility = () => setPasswordVisible(!passwordVisible);

  const onSubmitLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  const errorField = (fieldName: string) => {
    if (!error?.errors) return '';
    return error.errors.find((err: any) => err.field === fieldName)?.message || '';
  };

  const errorMessage = () => {
    if (error?.errors) return '';
    return error?.message;
  };

  const theme = useTheme();
  const xsDown = useMediaQuery(theme.breakpoints.down('sm'));
  const c = useStyles();
  return (
    <Box component={xsDown ? undefined : Paper} p={xsDown ? 3 : 5} className={c.formContainer}>
      <form onSubmit={onSubmitLogin}>
        <Box textAlign="center" mb={3}>
          <img src={`/${reactSVG}`} style={{ width: 128, height: 128 }} />
          <Typography variant="h5" gutterBottom>
            React Dashboard
          </Typography>
          <Typography gutterBottom>Login to your account to continue</Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoFocus
              type="email"
              label="Email Address"
              variant="outlined"
              error={Boolean(errorField('email'))}
              helperText={errorField('email')}
              value={email}
              onChange={onChangeEmail}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type={passwordVisible ? 'text' : 'password'}
              label="Password"
              variant="outlined"
              error={Boolean(errorField('password'))}
              helperText={errorField('password')}
              value={password}
              onChange={onChangePassword}
              fullWidth
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={onClickVisibility}>
                      <PasswordVisibilityIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>

        {errorMessage() && (
          <Alert className={c.alertError} severity="error">
            {errorMessage()}
          </Alert>
        )}

        <AppButton
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
          loading={loading}
          className={c.buttonLogin}
        >
          Login Now
        </AppButton>
        <Link to={'/signup'} style={{ textDecoration: 'none' }}>
          <Button variant="text" color="primary" size="large" fullWidth>
            Create New Account
          </Button>
        </Link>
      </form>
    </Box>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    formContainer: {
      width: 520,
      [theme.breakpoints.down('xs')]: { width: '100%' },
    },
    alertError: {
      marginTop: 24,
    },
    buttonLogin: {
      marginTop: 24,
      marginBottom: 8,
    },
  }),
);

export default LoginForm;
