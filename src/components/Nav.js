import React from 'react';
import {Link} from 'react-router-dom';
import { useAuth } from "../context/auth";

function Nav() {
  const { setAuthTokens } = useAuth();
  const isAuthenticated = useAuth();
  
  function logOut() {
    setAuthTokens();
    window.localStorage.removeItem('tokens');
  }

  const isAuthMenu = (
    <>
      <Link to="/">home</Link> | <Link to="/settings">settings</Link> | <button className='logout' onClick={logOut}>logout</button>
    </>
  )

  const notAuthMenu = (
    <>
      <Link to="/">home</Link> | <Link to="/login">login</Link>
    </>
  )
    
  return (
    <div className="row">
      <nav>
        {isAuthenticated.authTokens? isAuthMenu : notAuthMenu}
      </nav>
    </div>
  )
}



export default Nav