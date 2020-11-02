import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { GoogleLoginButton } from '../components/GoogleLoginButton';

import { useAuth } from '../context/auth';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '35ch',
    },
  },
  submit: {
    marginTop: 30,
  },
  googleDiv: {
    margin: theme.spacing(2),
  },
  spacer: {
    marginBottom: 70,
  },
}));

const Login = (props) => {
  const classes = useStyles();

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const { setAuthTokens } = useAuth();
  const [severity, setSeverity] = useState('');
  const [message, setMessage] = useState('');
  const [googleURL, setGoogleURL] = useState('');

  useEffect(() => {
    google_login_url().then((result) => {
      setGoogleURL(result);
    });
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    fetchAuthentication(email, password)
      .then((response) => {
        if (response.errors) {
          if (response.errors.length === 1) {
            setMessage(response.errors[0].msg);
          } else {
            setMessage('Server side validation errors.');
            //TODO: parse multiple errors and display with multiple snackbars. (HT-197)
          }
          setSeverity('error');
          setOpen(true);
        }
        if (response.user) {
          setAuthTokens(response.user);
          setLoggedIn(true);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  if (!isLoggedIn) {
    return (
      <main>
        <div className={classes.root}>
          {googleURL && (
            <div className={classes.googleDiv}>
              <h5>Sign in directly with Google.</h5>
              <GoogleLoginButton url={googleURL} />
              <div className={classes.spacer} />
              <h5>Or login with your local account.</h5>
            </div>
          )}
          <form onSubmit={handleSubmit} className={classes.root} noValidate>
            <TextField
              id="email"
              label="Email"
              type="text"
              autoComplete="username"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.submit}
            >
              Login
            </Button>
          </form>

          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity}>
              {message}
            </Alert>
          </Snackbar>
        </div>
      </main>
    );
  } else {
    return <Redirect to={'/settings'} />;
  }
};

async function fetchAuthentication(email, password) {
  try {
    const r = await fetch(`${process.env.REACT_APP_API}/api/users/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          email: email,
          password: password,
        },
      }),
    });
    const response = await r.json();
    return response;
  } catch (err) {
    return console.log(err);
  }
}

async function google_login_url() {
  try {
    const r = await fetch(`${process.env.REACT_APP_API}/api/google_login_url`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    });
    const response = await r.json();
    return response;
  } catch (err) {
    return console.log(err);
  }
}

export default Login;
