import React from 'react';
import {Link} from 'react-router-dom';
import { useAuth } from "../context/auth";

function Nav() {
  const { setAuthTokens } = useAuth();
  const isAuthenticated = useAuth();
  
  function logOut(event) {
    setAuthTokens();
    window.localStorage.removeItem('tokens');
    event.preventDefault();
  }

  const isAuth = (
    <>
      <Link to="/login" onClick={logOut}>Logout</Link>
    </>
  )

  const notAuth = (
    <>
      <Link to="/login">Login</Link>
    </>
  )
    
  return (
      <nav>
        <ul className="menu container">
          <li className="logo"><Link to="/">Health Tracker</Link></li>
          <li className="item hide"><Link to="/">Home</Link></li>
          <li className="item hide"><a href="/about">About</a></li>
          <li className="item"><Link to="/settings">Settings</Link></li>
          <li className="item">{isAuthenticated.authTokens? isAuth : notAuth}</li>
          <li className="item hide"><a href="/signup">Signup</a></li>
          <li className="toggle"><span className="bars"></span></li>
        </ul>
      </nav>
  )
}



export default Nav