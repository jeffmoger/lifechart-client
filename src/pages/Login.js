import React, {useState } from 'react';
import { Redirect } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { useAuth } from "../context/auth";


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '35ch',
    },
  },
  grid: {
    flexGrow: 1,
    marginLeft: 15,
  }
}));


const Login = (props) => {
  const classes = useStyles();
  
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthTokens } = useAuth();
  console.log('Rendering LoginForm')
  
  function handleSubmit(event) {
    fetchAuthentication(email, password )
      .then(response => {
        if (response.user) {
          setAuthTokens(response.user);
          setLoggedIn(true);
          
        } else {
          setIsError(true)
        }
      })
      .catch(e => {
        setIsError(true);
        console.log(e)
      })
    event.preventDefault();
  }

  function Error() {
    return (
      <pre style={{color: 'red'}}>TODO: error handling needed.</pre>
    )
  }
  if(!isLoggedIn) {
    return (

      <main>
      <div className={classes.grid}>
      <Grid container 
        justify="flex-start"
        alignItems="center"
        spacing={3}>
        <Grid item xs={6}>
          <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
            <TextField 
              id="email" 
              label="Email"
              type="text" 
              value={email}
              onChange={e => {
                setEmail(e.target.value);
              }}
              />
              <br />
            <TextField
              id="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={e => {
                setPassword(e.target.value);
              }}
            />
            <br />
            <br />
            <Button 
              variant="contained" 
              color="primary"
              type="submit">
              Login
            </Button>

          </form>
          {isError ? <Error /> : null }
        </Grid>
      </Grid>
    </div>
    </main>
    )
  } else {
    return <Redirect to={'/settings'} />
  }
}


  async function fetchAuthentication(email, password) {
    try {
      const r = await fetch(process.env.API_URL+'/api/users/login', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            "user": {
              "email": email,
              "password": password
            }
          }),
        });
      const response = await r.json();
      return response;
    }
    catch (err) {
      return console.log(err);
    }
  }

export default Login