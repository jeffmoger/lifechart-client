import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
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
    <Container maxWidth="md">
      <Typography
        variant="h6"
        component="h2"
        gutterBottom
        className={classes.h2}
      >
        The smart way to chart your health and fitness data
      </Typography>
      <Typography variant="body1" className={classes.p} gutterBottom>
        LifeChart is a personal health and fitness tracking and charting app for
        visualizing all of your health and fitness data from a single dashboard.
        Many specialized apps offer individual health, fitness and nutrition
        tracking capabilities that can provide excellent insights and encourage
        healthy habits. Unfortunately, when this data remains siloed, it loses
        much of its potential value.
      </Typography>
      <Typography variant="body1" className={classes.p} gutterBottom>
        LifeChart connects to your Google Fitness data and adds an additional
        layer of tracking for mood and other user defined categories. With the
        ability to see all of your information in one place, LifeChart’s custom
        chart creation and rich data visualizations can help you identify
        patterns and connections, offer actionable insight, and encourage a more
        holistic understanding of your overall well being. Our goal is to give
        you a more complete picture of how all of your inputs (nutrition, sleep,
        activity) work together to affect and shape the way you feel.
      </Typography>
      <Typography
        variant="h6"
        component="h2"
        gutterBottom
        className={classes.h2}
      >
        Benefits
      </Typography>
      <Typography
        variant="h6"
        component="h3"
        gutterBottom
        className={classes.h2}
      >
        Weight Loss / Management
      </Typography>
      <Typography variant="body1" className={classes.p} gutterBottom>
        View rich visualizations of your calories consumed versus calories
        burned. Calorie intake is also broken down into detailed nutrition
        information allowing granular tracking of specific inputs (sugar,
        sodium, trans fats).
      </Typography>
      <Typography
        variant="h6"
        component="h3"
        gutterBottom
        className={classes.h2}
      >
        Chronic Symptom Tracking
      </Typography>
      <Typography variant="body1" className={classes.p} gutterBottom>
        Recurring symptoms that don’t respond to occasional visits to the family
        doctor can be frustrating. Wouldn’t it be great if you could generate a
        chart with the occurrence of symptoms against a background of nutrition,
        activity and sleep data for the last six months to take with you to the
        doctor? LifeChart gives you this, and more.
      </Typography>
      <Typography
        variant="h6"
        component="h3"
        gutterBottom
        className={classes.h2}
      >
        Mood and Wellness
      </Typography>
      <Typography variant="body1" className={classes.p} gutterBottom>
        Mood tracking doesn’t get the attention that fitness and nutrition do,
        perhaps because mood feels too subjective to accurately measure. At the
        end of the day, our mood is the ultimate indicator of whether all our
        efforts to eat and exercise better was worth it. LifeChart provides
        easy, intuitive mood data entry and then charts that against your other
        categories of health data.
      </Typography>

      <Typography
        variant="h6"
        component="h3"
        gutterBottom
        className={classes.h2}
      >
        Motivation to Change Habits and Behaviour
      </Typography>
      <Typography variant="body1" className={classes.p} gutterBottom>
        The very act of tracking health data tends to bring focus to healthy
        habits. Indeed, lifeChart began as a simple project to bring better data
        to a doctor appointment but the act of tracking my own data did so much
        to improve my habits that a return to the doctor hasn’t been necessary.
      </Typography>

      <Typography
        variant="h6"
        component="h3"
        gutterBottom
        className={classes.h2}
      >
        Quantified-Self Enthusiasts
      </Typography>
      <Typography variant="body1" className={classes.p} gutterBottom>
        LifeChart is designed to give you control over creating, combining and
        over-laying your data to help you identify the trends or patterns unique
        to you. LifeChart aspires to be flexible enough to support your
        experiments, and we are very receptive to any feedback from the
        community to make our platform more useful.
      </Typography>

      <Typography
        variant="h6"
        component="h2"
        gutterBottom
        className={classes.h2}
      >
        Getting Started
      </Typography>
      <Typography variant="body1" className={classes.p} gutterBottom>
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
    </Container>
  );
}
