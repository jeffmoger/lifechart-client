import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: 0,
  },
  screenshots: {
    float: 'right',
    margin: 20,
    marginTop: 4,
  },
  paper: {
    padding: 20,
  },
  wide: {
    backgroundColor: '#404040',
    borderTop: '1px solid #4d4d4d',
    borderBottom: '1px solid #4d4d4d',
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
  slogan: { marginBottom: 20, marginTop: 20 },
  h2: {
    marginBottom: 5,
    color: () =>
      theme.palette.type === 'light'
        ? theme.palette.secondary.dark
        : theme.palette.secondary.light,
  },
  p: {
    marginBottom: 20,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    marginTop: 30,
    marginBottom: 30,
    flexWrap: 'wrap',
  },
  button: {
    width: 200,
    margin: 20,
  },
}));
export default function Intro(props) {
  const classes = useStyles();
  return (
    <Fade in={props.fade} timeout={5000}>
      <Container maxWidth="md">
        <Typography variant="body1" className={classes.p}>
          LifeChart is a personal health and fitness app that helps you track
          and visualize your health data from a single dashboard. While many
          apps offer fitness and nutrition tracking, LifeChart was designed to
          complement your existing data by combining it with additional data
          entry tools for tracking mood, symptoms and other categories of
          wellness. By bringing all of your health information into one place,
          our aim is to give you a fuller picture of how all of your inputs
          (nutrition, sleep, activity) work together to affect and shape the way
          you feel.
        </Typography>
        <Typography variant="body1" className={classes.p}>
          With intuitive data entry, custom chart creation and rich data
          visualizations, LifeChart can help you identify patterns and
          connections, offer actionable insight, and encourage a more holistic
          understanding of your overall well being.
        </Typography>
        <Typography variant="h5" component="h2" className={classes.slogan}>
          How does it work?
        </Typography>
        <Typography variant="body1" className={classes.p}>
          LifeChart starts by connecting to your Google Fitness account and
          syncing with your active fitness data. If you are tracking nutrition
          through a compatible third party app that syncs with Google Fit, we
          use your data to create charts and visualizations that go beyond what
          the Google Fit app presently displays. It is within the context of
          this ‘background’ information that you can use LifeChart to track
          specific symptoms, moods, or other events that may have an impact on
          your health.
        </Typography>
        <Typography variant="body1" className={classes.p}>
          When you log in to LifeChart with your Google ID, you are creating an
          account with us, and giving permission to sync your fitness,
          nutrition, and body metric data with LifeChart. Where appropriate we
          will save any data you create with us back to your Google Fit account.
          We will never sell or share your data, and you can delete your account
          along with all data stored with LifeChart at any time.
        </Typography>
        <Typography variant="body1" className={classes.p}>
          LifeChart is still in early development and has many features on its
          roadmap that have not been released. We hope you get value out of
          LifeChart in its current state, but we would also encourage you to
          join our beta testing group, and help shape our future direction.
          Details are on the signup page.
        </Typography>
        <Typography variant="h5" component="h2" className={classes.slogan}>
          Features and Benefits
        </Typography>
        <Typography variant="h6" component="h3" className={classes.h2}>
          Weight Loss / Management
        </Typography>
        <Typography variant="body1" className={classes.p}>
          View rich visualizations of your calories consumed versus calories
          burned. Calorie intake is also broken down into detailed nutrition
          information allowing granular tracking of specific inputs (sugar,
          sodium, trans fats).
        </Typography>
        <Typography variant="h6" component="h3" className={classes.h2}>
          Chronic Symptom Tracking
        </Typography>
        <Typography variant="body1" className={classes.p}>
          Recurring symptoms that don’t respond to occasional visits to the
          family doctor can be frustrating. Wouldn’t it be great if you could
          generate a chart with the occurrence of symptoms against a background
          of nutrition, activity and sleep data for the last six months to take
          with you to the doctor? LifeChart gives you this, and more.
        </Typography>
        <Typography variant="h6" component="h3" className={classes.h2}>
          Mood and Wellness
        </Typography>
        <Typography variant="body1" className={classes.p}>
          Mood tracking doesn’t get the attention that fitness and nutrition
          does, perhaps because mood feels too subjective to accurately measure.
          At the end of the day, our mood is the ultimate indicator of whether
          all our efforts to eat and exercise better was worth it. LifeChart
          provides easy, intuitive mood data entry and then charts that against
          your other categories of health data.
        </Typography>

        <Typography variant="h6" component="h3" className={classes.h2}>
          Motivation to Change Habits and Behaviour
        </Typography>
        <Typography variant="body1" className={classes.p}>
          The very act of tracking health data tends to bring focus to healthy
          habits. Indeed, lifeChart began as a simple project to bring better
          data to a doctor appointment but the act of tracking my own data did
          so much to improve my habits that a return to the doctor hasn’t been
          necessary.
        </Typography>

        <Typography variant="h6" component="h3" className={classes.h2}>
          Quantified-Self Enthusiasts
        </Typography>
        <Typography variant="body1" className={classes.p}>
          LifeChart is designed to give you control over creating, combining and
          over-laying your data to help you identify the trends or patterns
          unique to you. LifeChart aspires to be flexible enough to support your
          experiments, and we are very receptive to any feedback from the
          community to make our platform more useful.
        </Typography>

        <Typography variant="h5" component="h2" className={classes.slogan}>
          Getting Started
        </Typography>
        <Typography variant="body1" className={classes.p}>
          To get started, login to LifeChart with your{' '}
          <Link to="/login" className={classes.link}>
            Google account
          </Link>
          . This gives LifeChart permission to read your activity and nutrition
          data from Google Fit. If you do not have a GoogleFit account we do not
          recommend creating an account at this time, as the primary value we
          provide is the ability to layer additional data points on top of the
          background fitness and nutrition you are already collecting. A{' '}
          <Link to="/demo" className={classes.link}>
            demo of a LifeChart dashboard can seen here
          </Link>
          .
        </Typography>
        <div className={classes.buttonContainer}>
          <Button
            variant="outlined"
            color="inherit"
            component={Link}
            to="/demo"
            className={classes.button}
          >
            Sample Charts
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            component={Link}
            to="/login"
            className={classes.button}
          >
            Sign In
          </Button>
        </div>
      </Container>
    </Fade>
  );
}
