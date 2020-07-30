import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import Switch from '../components/Switch';
import queryString from 'query-string';
import DisplaySyncReport from '../components/DisplaySyncReport';

import moveDataFromGoogle from '../functions/moveDataFromGoogle';
import getData from '../functions/getData';
import loadChartData from '../functions/loadChartData';

const useStyles = makeStyles((theme) => ({
  grid: {
    flexGrow: 1,
  },
}));

function Settings(props) {
  const classes = useStyles();
  const { id, token, googleFit } = JSON.parse(localStorage.getItem('tokens'));
  const stringValues = queryString.parse(props.location.search);

  const [googleUrl, setGoogleUrl] = useState('');
  const [googleCode, setGoogleCode] = useState('');
  const [googleAuth, setGoogleAuth] = useState('');
  const [googleSwitch, setGoogleSwitch] = useState(googleFit);
  const [displayResponse, setDisplayResponse] = useState(false);

  useEffect(() => {
    if (!googleFit && !googleCode && !googleUrl && googleSwitch) {
      console.log('ready to call google code button');
      getGoogleCode(id, token).then((response) => setGoogleUrl(response));
    }
  }, [id, token, googleFit, googleCode, googleUrl, googleSwitch]);

  useEffect(() => {
    if (stringValues.code) {
      console.log(stringValues.code);
      setGoogleCode(stringValues.code);
    }
  }, [stringValues.code]);

  useEffect(() => {
    if (googleCode) {
      getGoogleAuth(id, token, googleCode, setGoogleSwitch, setGoogleCode).then(
        (response) => {
          setGoogleAuth(response);
        }
      );
    }
  }, [googleCode, googleAuth, id, token]);

  function handleSync() {
    moveDataFromGoogle(id, token)
      .then((response) => {
        var dataObject = {};
        dataObject.syncReport = response;
        return dataObject;
      })
      .then(async (dataObject) => {
        dataObject.data = await getData(id, token);
        return dataObject;
      })
      .then((dataObject) => {
        dataObject.chartData = loadChartData(dataObject);
        dataObject.fetched = new Date().getTime();
        return dataObject;
      })
      .then((dataObject) => {
        setDisplayResponse(dataObject.syncReport);
        localStorage.setItem('sync', JSON.stringify(dataObject));
      })
      .catch((err) => console.log(err));
  }

  const GoogleSyncButton = (props) => {
    return (
      <Button variant="contained" type="button" onClick={handleSync}>
        Sync Data
      </Button>
    );
  };

  function handleSwitchChange(googleSwitch) {
    setGoogleSwitch(googleSwitch.googleSwitch);
  }

  const GoogleCodeButton = (props) => {
    return (
      <Button variant="contained" type="button" href={props.url}>
        Authenticate with Google
      </Button>
    );
  };

  return (
    <main>
      <div className={classes.grid}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <p>Manage data sync with Google here.</p>
            <Switch
              label="Connect to Google Fit"
              color="primary"
              name="googleSwitch"
              googleSwitch={googleSwitch}
              onSwitchChange={handleSwitchChange}
            />
            {googleFit ? <GoogleSyncButton /> : null}
            {Array.isArray(displayResponse) ? (
              <DisplaySyncReport data={displayResponse} />
            ) : null}
            {!googleFit && !googleCode && googleUrl && googleSwitch ? (
              <GoogleCodeButton url={googleUrl} />
            ) : null}
            {googleCode && !googleAuth ? <Redirect to="/settings" /> : null}
            <div id="response"></div>
          </Grid>
        </Grid>
      </div>
    </main>
  );
}

async function getGoogleCode(id, token) {
  try {
    const r = await fetch(`${process.env.REACT_APP_API}/api/get_google_code`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: 'Token ' + token,
        id: id,
      },
    });
    const response = await r.json();
    return response;
  } catch (err) {
    return console.log(err);
  }
}

async function getGoogleAuth(id, token, code, setGoogleSwitch, setGoogleCode) {
  try {
    const r = await fetch(`${process.env.REACT_APP_API}/api/get_google_auth`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: 'Token ' + token,
        id: id,
        code: code,
      },
    });
    const response = await r.json();
    if (response.access_token) {
      //sessionStorage.setItem("googleAuth", JSON.stringify(response));
      const tokens = JSON.parse(localStorage.getItem('tokens'));
      localStorage.setItem(
        'tokens',
        JSON.stringify({
          ...tokens,
          googleFit: true,
          updated: new Date().getTime(),
        })
      );
      setGoogleSwitch(true);
      setGoogleCode('');
    }
    return response;
  } catch (err) {
    return console.log(err);
  }
}

export default Settings;
