import React, {useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Switch from '../components/Switch'
import queryString from 'query-string'



function Settings(props) {

  const { id, token, googleFit } = JSON.parse(localStorage.getItem("tokens"));
  const stringValues = queryString.parse(props.location.search)
  
  const [googleUrl, setGoogleUrl] = useState('');
  const [googleCode, setGoogleCode] = useState('');
  const [googleAuth, setGoogleAuth] = useState('');
  const [googleSwitch, setGoogleSwitch] = useState(googleFit);
  const [displayResponse, setDisplayResponse] = useState(false);

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

  function handleSync(){
    move_data_from_google(id, token)
    .then(response => {
      localStorage.setItem("sync", JSON.stringify(response));
      setDisplayResponse(response)
    })
    
  }

  const GoogleSyncButton = props => {
    return (
      <button type='button' onClick={handleSync}>Sync Data</button>
    )
  }

  const DisplaySyncReport = props => {
    const { data } = props
    return (
      <table>
        <thead>
          <tr>
            <td>Data Source</td>
            <td>Modified</td>
            <td>New</td>
          </tr>
        </thead>
        <tbody>
        {data.map((dat, index) => (
          <tr key={index}>
            <td>{dat[0].replace('com.google.','')}</td>
            <td>{dat[1]}</td>
            <td>{dat[2]}</td>
          </tr>
        ))}
        </tbody>
      </table>
    );
  };

  function handleSwitchChange(googleSwitch) {
    setGoogleSwitch(googleSwitch.googleSwitch)
  }

  const GoogleCodeButton = (props) => {
    return (
      <a href={props.url} className='button button-primary'>Authenticate with Google</a>
    )
  }

  
  return (
    <main>
      <h3>Settings</h3>
      <p>Manage data sync with Google here.</p>
      <Switch label='Connect to Google Fit' color='primary' name='googleSwitch' googleSwitch={googleSwitch} onSwitchChange={handleSwitchChange} />
      {googleFit ? <GoogleSyncButton />:null}
      {displayResponse ? <DisplaySyncReport data={displayResponse} />:null}
      {!googleFit && !googleCode && googleUrl && googleSwitch ? <GoogleCodeButton url={googleUrl} />:null}
      {googleCode && !googleAuth ? <Redirect to='/settings' />:null}
      <div id="response"></div>
    </main>
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

async function move_data_from_google(id, token) {
  try {
    const r = await fetch('https://localhost/api/move_data_from_google', {
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


