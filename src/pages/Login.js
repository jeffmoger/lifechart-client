import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

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

export default Login;
