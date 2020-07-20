import {
  Avatar,
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
import React, { ChangeEvent, FormEvent, useState } from 'react';
import PasswordVisibilityIcon from '@material-ui/icons/VisibilityOffOutlined';
import { Link } from 'react-router-dom';
import { PostRequestResult } from '../contexts/useRequest';
import Alert from '@material-ui/lab/Alert';

export interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface Props {
  onSubmit: (data: SignUpData) => void;
  error: PostRequestResult['error'];
}

const SignUpForm: React.FC<Props> = ({ onSubmit, error }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const onChangeFirstName = (e: ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value);
  const onChangeLastName = (e: ChangeEvent<HTMLInputElement>) => setLastName(e.target.value);
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const onClickVisibility = () => setPasswordVisible(!passwordVisible);

  const onSubmitLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ firstName, lastName, email, password });
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
          <Avatar variant="circle" className={c.avatar} src="https://bit.ly/2UxBGcC" />
          <Typography variant="h5" gutterBottom>
            DGTB Admin
          </Typography>
          <Typography gutterBottom>Login to your account to continue</Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              autoFocus
              type="text"
              label="First Name"
              error={Boolean(errorField('firstName'))}
              helperText={errorField('firstName')}
              variant="outlined"
              value={firstName}
              onChange={onChangeFirstName}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="text"
              label="Last Name"
              error={Boolean(errorField('lastName'))}
              helperText={errorField('lastName')}
              variant="outlined"
              value={lastName}
              onChange={onChangeLastName}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="email"
              label="Email Address"
              error={Boolean(errorField('email'))}
              helperText={errorField('email')}
              variant="outlined"
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
              error={Boolean(errorField('password'))}
              helperText={errorField('password')}
              variant="outlined"
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

        <Button
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
          className={c.buttonSignUp}
        >
          Sign Up
        </Button>
        <Link to={'/login'} style={{ textDecoration: 'none' }}>
          <Button variant="text" color="primary" size="large" fullWidth>
            Login to my account
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
    avatar: {
      width: 84,
      height: 84,
      margin: 'auto',
      marginBottom: 20,
    },
    alertError: {
      marginTop: 24,
    },
    buttonSignUp: {
      marginTop: 24,
      marginBottom: 8,
    },
  }),
);

export default SignUpForm;
