import React from "react";
import Nav from '../components/Nav'

function Settings(props) {
  const { id, token } = JSON.parse(localStorage.getItem("tokens"));

  function handleClick() {
    refreshDataWithGoogle(id, token)
    .then(response => {
      localStorage.setItem('data', JSON.stringify(response));
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


async function refreshDataWithGoogle(id, token) {
  try {
    const r = await fetch('/api/get_token', {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'authorization': 'Token ' + token,
          'id': id
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


