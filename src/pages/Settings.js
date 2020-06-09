import React, {useState, useEffect } from "react";
import Nav from '../components/Nav'
import Switch from '../components/Switch'



function Settings(props) {

  //const { id, token, googleFit } = JSON.parse(localStorage.getItem("tokens"));
  const [tokens, setTokens] = useState(JSON.parse(localStorage.getItem("tokens")))
  const [checkedA, setCheckedA] = useState(false);
  const [googleUrl, setGoogleUrl] = useState('');

  useEffect(() => {
    if (!tokens.googleFit && tokens.googleSwitch) {
      console.log('ready to call google code button')
      if(!googleUrl) {
        refreshDataWithGoogle(tokens.id, tokens.token)
        .then(response => setGoogleUrl(response))
      }
    }
    if(tokens.googleFit || tokens.googleSwitch) {
      setCheckedA(true)
    }
  }, [
    tokens.googleSwitch,
    tokens.googleFit,
    googleUrl,
    tokens.id,
    tokens.token 
  ])

  
  function handleSwitchChange(checkedA) {
    setCheckedA(checkedA.checkedA)
    setTokens({...tokens, googleSwitch: checkedA.checkedA, updated: new Date().getTime()})
    localStorage.setItem("tokens", JSON.stringify(
      {...tokens, googleSwitch: checkedA.checkedA, updated: new Date().getTime()}
      ))
  }

  const GoogleCodeButton = (url) => {
    return (
      <a href={url}>Google Auth</a>
    )
  }



  
  
  return (
    <div id="main-container" className="eleven columns" style={{marginTop: '5%'}}>
      <Nav />
      <h3>Settings</h3>
      <p>Manage data sync with Google here.</p>
      <Switch label='Connect to Google Fit' color='primary' name='checkedA' checkedA={checkedA} onSwitchChange={handleSwitchChange} />
      {googleUrl && tokens.googleSwitch ? <a href={googleUrl}>link</a>:null}
      <div id="response"></div>
    </div>
    )
}


async function refreshDataWithGoogle(id, token) {
  try {
    const r = await fetch('api/get_google_token', {
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


