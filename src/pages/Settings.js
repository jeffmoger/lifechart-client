import React from "react";
import Nav from '../components/Nav'

function Settings(props) {
  const { token } = JSON.parse(localStorage.getItem("tokens"));

  function handleClick() {
    refreshDataWithGoogle(token)
    .then(response => {
      localStorage.setItem('changes', JSON.stringify(response));
    })
  }
  
  
  return (
    <div id="main-container" className="eleven columns" style={{marginTop: '5%'}}>
      <Nav />
      <h3>Settings</h3>
      <p>Manage data sync with Google here.</p>
      <button onClick={handleClick}>Refresh Data</button>
    </div>
    )
}


async function refreshDataWithGoogle(token) {
  try {
    const r = await fetch('/api/data', {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'authorization': 'Token ' + token
        },
      });
    const response = await r.json();
    return response;
  }
  catch (err) {
    return console.log(err);
  }
}

export default Settings;


