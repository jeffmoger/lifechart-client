import React, {useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Nav from '../components/Nav'
import Switch from '../components/Switch'
import queryString from 'query-string'



function Settings(props) {

  const { id, token, googleFit } = JSON.parse(localStorage.getItem("tokens"));
  const stringValues = queryString.parse(props.location.search)
  
  const [googleUrl, setGoogleUrl] = useState('');
  const [googleCode, setGoogleCode] = useState('');
  const [googleAuth, setGoogleAuth] = useState('');
  const [googleSwitch, setGoogleSwitch] = useState(googleFit);

  /*useEffect(() => {
    console.log(`isGoogleFit: ${isGoogleFit}`)
    console.log(`googleUrl: ${googleUrl}`)
    console.log(`googleCode: ${googleCode}`)
    console.log(`googleAuth: ${googleAuth}`)
    console.log(`googleSwitch: ${googleSwitch}`)
  })*/


  useEffect(() => {
    if (!googleFit && !googleCode && !googleUrl && googleSwitch) {
      console.log('ready to call google code button')
      getGoogleCode(id, token)
      .then(response => setGoogleUrl(response))
    }
  }, [
    id,
    token,
    googleFit,
    googleCode,
    googleUrl,
    googleSwitch
  ])

  useEffect(() => {
    if(stringValues.code) {
      console.log(stringValues.code)
      setGoogleCode(stringValues.code)
    } 
  },[stringValues.code])


  useEffect(() => {
    if (googleCode) {
      getGoogleAuth(id, token, googleCode, setGoogleSwitch, setGoogleCode )
      .then(response => {
        setGoogleAuth(response)
      })
    }
  },[googleCode, googleAuth, id, token])


  function handleSwitchChange(googleSwitch) {
    setGoogleSwitch(googleSwitch.googleSwitch)
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
      <Switch label='Connect to Google Fit' color='primary' name='googleSwitch' googleSwitch={googleSwitch} onSwitchChange={handleSwitchChange} />
      {!googleFit && !googleCode && googleUrl && googleSwitch ? <GoogleCodeButton url={googleUrl} />:null}
      {googleCode && !googleAuth ? <Redirect to='/settings' />:null}
      <div id="response"></div>
    </div>
    )
}


async function getGoogleCode(id, token) {
  try {
    const r = await fetch('https://localhost/api/get_google_code', {
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


async function getGoogleAuth(id, token, code, setGoogleSwitch, setGoogleCode) {
  try {
    const r = await fetch('https://localhost/api/get_google_auth', {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'authorization': 'Token ' + token,
          'id': id,
          'code': code
        },
      });
    const response = await r.json();
    if (response.access_token) {
      //sessionStorage.setItem("googleAuth", JSON.stringify(response));
      const tokens = JSON.parse(localStorage.getItem("tokens"));
      localStorage.setItem("tokens", JSON.stringify(
        {...tokens, googleFit: true, updated: new Date().getTime()}
        ))
      setGoogleSwitch(true)
      setGoogleCode('')
    }
    return response;
  }
  catch (err) {
    return console.log(err);
  }
}


export default Settings;


