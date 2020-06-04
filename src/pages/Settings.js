import React from "react";
import { useAuth } from "../context/auth";
import Nav from '../components/Nav'

function Settings(props) {
  const { setAuthTokens } = useAuth();
  const { token } = JSON.parse(localStorage.getItem("tokens"));
  console.log(token)
  
  return (
    <div id="main-container" className="eleven columns" style={{marginTop: '5%'}}>
      <Nav />
      <h3>Settings</h3>
      <p>Manage data sync with Google here.</p>
      <button>Refresh Data</button>
    </div>
    )
}

export default Settings;


