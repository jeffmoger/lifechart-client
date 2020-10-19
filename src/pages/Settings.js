import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import Switch from '../components/Switch';
import queryString from 'query-string';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import FormSubmitProfile from '../components/FormSubmitProfile';
import FormSubmitSymptoms from '../components/FormSubmitSymptoms';
import DataSourceId from '../components/DataSourceId';

const useStyles = makeStyles((theme) => ({
  grid: {
    flexGrow: 1,
  },
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
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
  const [expanded, setExpanded] = React.useState(false);
  const [profile, setProfile] = useState('');

  useEffect(() => {
    getProfile(id, token).then((result) => setProfile(result));
  }, [id, token]);

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

  function handleSwitchChange(googleSwitch) {
    setGoogleSwitch(googleSwitch.googleSwitch);
  }

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const GoogleCodeButton = (props) => {
    return (
      <Button variant="contained" type="button" href={props.url}>
        Authenticate with Google
      </Button>
    );
  };

  return (
    <main>
      <div className={classes.root}>
        <Accordion
          expanded={expanded === 'panel1'}
          onChange={handleChange('panel1')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={classes.heading}>My Profile</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {profile ? (
              <FormSubmitProfile id={id} token={token} profile={profile} />
            ) : null}
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel2'}
          onChange={handleChange('panel2')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography className={classes.heading}>Google Sync</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className={classes.grid}>
              <Switch
                label="Connect to Google Fit"
                color="primary"
                name="googleSwitch"
                googleSwitch={googleSwitch}
                onSwitchChange={handleSwitchChange}
              />
              {!googleFit && !googleCode && googleUrl && googleSwitch ? (
                <GoogleCodeButton url={googleUrl} />
              ) : null}
              {googleCode && !googleAuth ? <Redirect to="/settings" /> : null}
              {googleFit ? (
                <DataSourceId token={token} profile={profile} />
              ) : null}
              <div id="response"></div>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel4'}
          onChange={handleChange('panel4')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography className={classes.heading}>Symptoms</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormSubmitSymptoms id={id} token={token} profile={profile} />
          </AccordionDetails>
        </Accordion>
      </div>
    </main>
  );
}

async function getProfile(id, token) {
  const response = await fetch(`${process.env.REACT_APP_API}/api/users/read`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      authorization: 'Token ' + token,
      id: id,
    },
  });
  return response.json();
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
