import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { GoogleLoginButton } from '../components/GoogleLoginButton';

import { useAuth } from '../context/auth';

const useStyles = makeStyles((theme) => ({
  flexContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  wrap: {
    flexWrap: 'wrap',
  },
  formFields: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  flexPaper: {
    width: 400,
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15,
  },
  flexItem: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 10,
  },
  textField: {
    width: '100%',
  },
  submit: {
    width: '100%',
    marginTop: 20,
    marginBottom: 30,
  },
  paper: {
    marginBottom: 20,
    padding: 10,
    background: () => (theme.palette.type === 'light' ? '#EEE' : '#424242'),
  },
  googleLogin: {
    padding: 30,
  },
  or: {
    paddingTop: 20,
    flexGrow: 1,
    border: '1px solid #000',
    textAlign: 'center',
  },
  h2: {
    color: () => (theme.palette.type === 'light' ? '#444' : '#bbb'),
    textShadow: () =>
      theme.palette.type === 'light' ? 'none' : '1px 1px #000',
    marginTop: 10,
  },
  smallprint: {
    fontSize: 11,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 30,
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
        <Container
          className={`${classes.flexContainer} ${classes.wrap}`}
          maxWidth="md"
        >
          <Paper component="div" className={`${classes.flexPaper}`}>
            <Typography
              variant="h6"
              component="h2"
              align="center"
              className={`${classes.h2}`}
            >
              Sign in with Google
            </Typography>
            <div className={`${classes.googleLogin} ${classes.item}`}>
              <GoogleLoginButton url={googleURL} />
            </div>
            <Typography variant="body2" className={classes.smallprint}>
              Signing in with Google will authorize LifeChart to access your
              fitness information stored with GoogleFit.
            </Typography>
          </Paper>
          <Paper component="div" className={`${classes.flexPaper}`}>
            <Typography
              variant="h6"
              component="h2"
              align="center"
              className={`${classes.h2}`}
            >
              Login
            </Typography>
            <form
              onSubmit={handleSubmit}
              noValidate
              className={`${classes.formFields}`}
            >
              <div className={classes.flexItem}>
                <TextField
                  id="email"
                  label="Email"
                  type="text"
                  autoComplete="username"
                  value={email}
                  className={classes.textField}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className={classes.flexItem}>
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  className={classes.textField}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className={classes.flexItem}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className={classes.submit}
                >
                  Login
                </Button>
              </div>
            </form>
          </Paper>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity}>
              {message}
            </Alert>
          </Snackbar>
        </Container>
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
