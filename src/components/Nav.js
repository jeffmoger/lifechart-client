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
        <ul className="menu">
          <li class="logo"><Link to="/">Health Tracker</Link></li>
          <li class="item hide"><Link to="/">Home</Link></li>
          <li class="item hide"><a href="/about">About</a></li>
          <li class="item"><Link to="/settings">Settings</Link></li>
          <li class="item">{isAuthenticated.authTokens? isAuth : notAuth}</li>
          <li class="item hide"><a href="/signup">Signup</a></li>
          <li class="toggle"><span class="bars"></span></li>
          
        </ul>
      </nav>
  )
}



export default Nav