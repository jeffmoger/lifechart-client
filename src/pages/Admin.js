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
    <main>
      <h3>Admin</h3>
      <button onClick={logOut}>Log out</button>
    </main>
    )
}

export default Admin;


