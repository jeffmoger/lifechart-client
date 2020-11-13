import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
    maxWidth: 650,
  },
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing(1)}px auto`,
    //padding: theme.spacing(3),
    passing: 20,
  },
  link: {
    color: () =>
      theme.palette.type === 'light'
        ? theme.palette.secondary.dark
        : theme.palette.secondary.main,
    textDecoration: () =>
      theme.palette.type === 'light' ? 'underline' : 'none',
  },
  hide: {
    display: 'none',
  },
  h2: {
    marginBottom: 20,
  },
  p: {
    marginBottom: 20,
  },
}));

export default function Intro() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography
        variant="h5"
        component="h1"
        className={classes.hide}
        gutterBottom
      >
        LifeChart
      </Typography>
      <Typography
        variant="h6"
        component="h2"
        gutterBottom
        className={classes.h2}
      >
        The smart way to visualize your health and fitness data.
      </Typography>
      <Typography variant="body1" className={classes.p} gutterBottom>
        Today, a large variety of specialized apps offer individual health,
        fitness and nutrition tracking capabilities that can provide insight and
        encourage healthy habits. The problem is that the data from each is
        siloed. There has not been a convenient way to consolidate all of this
        data in a way that lets us look for patterns and connections between all
        of our different categories of health.
      </Typography>
      <Typography variant="body1" className={classes.p} gutterBottom>
        LifeChart takes the data that you collect through wearables and
        nutrition tracking apps and consolidates it to form a baseline of health
        metrics upon which you can overlay additional tracking data, such as
        sleep and unique symptoms, as well as subjective information about how
        you feel. The idea is to give you a more complete picture of how all of
        your outputs (activities) and inputs (nutrition) may be working together
        to affect your overall wellness.
      </Typography>
      <Typography variant="body1" className={classes.p} gutterBottom>
        We are currently in an early testing phase. If you are using Google Fit
        to track fitness data and a compatible nutrition tracking app, we invite
        you to{' '}
        <Link to="/login" className={classes.link}>
          join our beta testing group
        </Link>{' '}
        today.
      </Typography>
      <Typography variant="body1" className={classes.p} gutterBottom>
        You may also find a demo page with sample data to get a sense of how{' '}
        <Link to="/demo" className={classes.link}>
          LifeChart works here
        </Link>
        .
      </Typography>
    </div>
  );
}
