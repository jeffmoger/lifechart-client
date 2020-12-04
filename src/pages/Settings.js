import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Container from '@material-ui/core/Container';

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
import FormSubmitGoals from '../components/FormSubmitGoals';
import FormSubmitSymptoms from '../components/FormSubmitSymptoms';
import DeleteAccount from '../components/DeleteAccount';
import DataSourceId from '../components/DataSourceId';
import { getProfile } from '../functions/apiCalls';
import { useAuth } from '../context/auth';

const useStyles = makeStyles((theme) => ({
  grid: {
    flexGrow: 1,
  },
  root: {
    width: '100%',
    marginTop: 20,
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
  detailsContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  deleteContainer: {
    marginTop: 40,
  },
}));

function Settings(props) {
  const {
    authTokens: { id, token, googleFit, dataSourceIds },
  } = useAuth();
  const classes = useStyles();
  const stringValues = queryString.parse(props.location.search);
  const [googleUrl, setGoogleUrl] = useState('');
  const [googleCode, setGoogleCode] = useState('');
  const [googleAuth, setGoogleAuth] = useState('');
  const [googleSwitch, setGoogleSwitch] = useState(googleFit);
  const [expanded, setExpanded] = useState(false);
  const [profile, setProfile] = useState('');
  const [switchLabel, setSwitchLabel] = useState('Connect to Google Fit');

  useEffect(() => {
    getProfile(token).then((result) => setProfile(result));
  }, [token]);

  useEffect(() => {
    if (!googleFit && !googleCode && !googleUrl && googleSwitch) {
      console.log('ready to call google code button');
      setSwitchLabel('Connecting to Google Fit');
      getGoogleCode(id, token).then((response) => setGoogleUrl(response));
    }
    if (googleFit && googleSwitch) {
      setSwitchLabel('Connected to Google Fit');
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
      <Container className={classes.root} maxWidth="md">
        <Accordion
          expanded={expanded === 'panel-profile'}
          onChange={handleChange('panel-profile')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel-profile-content"
            id="panel-profile-header"
          >
            <Typography className={classes.heading}>My Profile</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {profile ? (
              <div className={classes.detailsContainer}>
                <FormSubmitProfile id={id} token={token} profile={profile} />
                <div className={classes.deleteContainer}>
                  <DeleteAccount token={token} />
                </div>
              </div>
            ) : null}
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded === 'panel-goals'}
          onChange={handleChange('panel-goals')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel-goals-content"
            id="panel-goals-header"
          >
            <Typography className={classes.heading}>Goals</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {profile ? (
              <FormSubmitGoals id={id} token={token} profile={profile} />
            ) : null}
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded === 'panel-googlesync'}
          onChange={handleChange('panel-googlesync')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel-googlesync-content"
            id="panel-googlesync-header"
          >
            <Typography className={classes.heading}>Google Sync</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className={classes.grid}>
              <Switch
                label={switchLabel}
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
                <DataSourceId
                  token={token}
                  googleFit={googleFit}
                  dataSourceIds={dataSourceIds}
                />
              ) : null}
              <div id="response"></div>
            </div>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded === 'panel-symptoms'}
          onChange={handleChange('panel-symptoms')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel-symptoms-content"
            id="panel-symptoms-header"
          >
            <Typography className={classes.heading}>Symptoms</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormSubmitSymptoms id={id} token={token} profile={profile} />
          </AccordionDetails>
        </Accordion>
      </Container>
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
