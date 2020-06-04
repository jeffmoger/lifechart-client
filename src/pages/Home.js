import React from "react";
import {Link} from 'react-router-dom';
import { useAuth } from "../context/auth";



function Home(props) {
  const isAuthenticated = useAuth();
  console.log('rendering Home')
  

  const isAuthMessage = (
    <>
      <p>This message is for you if you have already logged in. Visit <Link to="/settings">settings</Link>.</p>
    </>
  )
  const notAuthMessage = (
    <>
      <p>This message is for you if you have not logged in. <Link to="/login">Login</Link></p>
    </>
  )
  return (
    <div id="main-container" className="eleven columns" style={{marginTop: '5%'}}>
      <h3>Home</h3>
      {isAuthenticated.authTokens? isAuthMessage : notAuthMessage }
    </div>
    )
}

export default Home;