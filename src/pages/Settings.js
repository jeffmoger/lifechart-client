import React, {useState, useEffect } from "react";
import Nav from '../components/Nav'
import Switch from '../components/Switch'
import queryString from 'query-string'



function Settings(props) {

  //const { id, token, googleFit } = JSON.parse(localStorage.getItem("tokens"));
  const stringValues = queryString.parse(props.location.search)
  const [tokens, setTokens] = useState(JSON.parse(localStorage.getItem("tokens")))
  const [checkedA, setCheckedA] = useState(false);
  const [googleUrl, setGoogleUrl] = useState('');
  const [googleCode, setGoogleCode] = useState('');

  useEffect(() => {
    if (!tokens.googleFit && !googleCode && tokens.googleSwitch) {
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
    tokens.token,
    googleCode
  ])

  useEffect(() => {
    stringValues.code && setGoogleCode(stringValues.code)
  },[stringValues.code])


  
  function handleSwitchChange(checkedA) {
    setCheckedA(checkedA.checkedA)
    setTokens({...tokens, googleSwitch: checkedA.checkedA, updated: new Date().getTime()})
    localStorage.setItem("tokens", JSON.stringify(
      {...tokens, googleSwitch: checkedA.checkedA, updated: new Date().getTime()}
      ))
  }

  const GoogleCodeButton = (props) => {
    return (
      <a href={props.url} className='button button-primary'>Authenticate with Google</a>
    )
  }



  
  
  return (
    <div id="main-container" className="eleven columns" style={{marginTop: '5%'}}>
      <Nav />
      <h3>Settings</h3>
      <p>Manage data sync with Google here.</p>
      <Switch label='Connect to Google Fit' color='primary' name='checkedA' checkedA={checkedA} onSwitchChange={handleSwitchChange} />
      {googleUrl && tokens.googleSwitch && !googleCode ? <GoogleCodeButton url={googleUrl} />:null}
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


