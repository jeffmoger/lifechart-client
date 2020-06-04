import React from "react";
import { useAuth } from "../context/auth";

function Admin(props) {
  const { setAuthTokens } = useAuth();
  
  function logOut() {
    setAuthTokens();
    window.localStorage.removeItem('tokens');
  }
  //console.log(props)

  return (
    <div id="main-container" className="eleven columns" style={{marginTop: '5%'}}>
      <h3>Admin</h3>
      <button onClick={logOut}>Log out</button>
    </div>
    )
}

export default Admin;


