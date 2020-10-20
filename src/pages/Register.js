import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { createNewUser } from '../functions/apiCalls';

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

const Register = (props) => {
  const classes = useStyles();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [open, setOpen] = useState(false);
  const { setAuthTokens } = useAuth();
  const [severity, setSeverity] = useState('');
  const [message, setMessage] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    if (password !== password2) {
      setSeverity('error');
      setMessage("Passwords don't match");
      setOpen(true);
      setPassword('');
      setPassword2('');
      return;
    }

    createNewUser(email, password)
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
          <form
            onSubmit={handleSubmit}
            className={classes.root}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="email"
              label="Email Address"
              type="text"
              autoComplete="username"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              id="password"
              label="Create Password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <TextField
              id="password2"
              label="Confirm Password"
              type="password"
              autoComplete="new-password"
              value={password2}
              onChange={(e) => {
                setPassword2(e.target.value);
              }}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.submit}
            >
              Submit
            </Button>
          </form>
        </div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={severity}>
            {message}
          </Alert>
        </Snackbar>
      </main>
    );
  } else {
    return <Redirect to={'/settings'} />;
  }
};

export default Register;
