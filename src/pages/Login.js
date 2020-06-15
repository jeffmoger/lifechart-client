import React, {useState } from 'react';
import { Redirect } from "react-router-dom";
import { useAuth } from "../context/auth";


const Login = (props) => {
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
      <h3>login</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">email: </label>
        <input name="email" 
          id="email" 
          type="text" 
          value={email}
          onChange={e => {
            setEmail(e.target.value);
          }} />
        <label htmlFor="password">password: </label>
        <input name="password" 
          id="password" 
          type="password"
          value={password}
          onChange={e => {
            setPassword(e.target.value);
          }} />
        <br />
        <button type="submit" className="button-primary">Submit</button>
      </form>
      {isError ? <Error /> : null }
    </main>
    )
  } else {
    return <Redirect to={'/settings'} />
  }
}


  async function fetchAuthentication(email, password) {
    try {
      const r = await fetch('/api/users/login', {
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