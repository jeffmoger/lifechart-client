import React from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { withStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '400px',
    marginTop: 50,
  },
  vertical: {
    height: 300,
    flexGrow: 1,
    //textAlign: 'center',
    marginLeft: 20,
  },
  horizontal: {
    width: 300,
    margin: '0 auto',
  },
});

const marks = [
  {
    value: 0,
  },
  {
    value: 1,
  },
  {
    value: 2,
  },
  {
    value: 3,
  },
  {
    value: 4,
  },
  {
    value: 5,
  },
  {
    value: 6,
  },
  {
    value: 7,
  },
  {
    value: 8,
  },
  {
    value: 9,
  },
  {
    value: 10,
  },
];

const CustomSlider = withStyles({
  root: {
    color: '#5D4E8C',
    height: 8,
    '&$vertical': {
      width: 8,
    },
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#111',
    border: '4px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover': {
      boxShadow: '0px 0px 0px 8px rgba(93, 78, 140, 0.16)',
    },
    '&$active': {
      boxShadow: '0px 0px 0px 12px rgba(93, 78, 140, 0.16)',
    },
  },
  active: {},
  valueLabel: {
    left: -40,
    top: 1,
    '& *': {
      background: 'transparent',
      color: '#b6add1',
    },
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
  mark: {
    backgroundColor: '#000',
    height: 1,
    width: 8,
    marginTop: -3,
  },
  markActive: {
    opacity: 1,
    backgroundColor: 'currentColor',
  },
  vertical: {
    '& $rail': {
      width: 8,
    },
    '& $track': {
      width: 8,
    },
    '& $thumb': {
      marginLeft: -8,
      marginBottom: -11,
    },
  },
})(Slider);

export default function DataEntryMood() {
  const classes = useStyles();
  return (
    <div>
      <Typography
        id="energy-slider"
        variant="body1"
        align="center"
        gutterBottom
      >
        How do you feel?
      </Typography>
      <div className={classes.container}>
        <div className={classes.vertical}>
          <CustomSlider
            orientation="vertical"
            aria-label="energy"
            defaultValue={0}
            marks={marks}
            step={1}
            min={0}
            max={10}
            valueLabelDisplay="off"
          />
          <Typography id="energy-slider" variant="caption">
            Energy
          </Typography>
        </div>
        <div className={classes.vertical}>
          <CustomSlider
            orientation="vertical"
            aria-label="irritable"
            defaultValue={0}
            marks={marks}
            step={1}
            min={0}
            max={10}
            valueLabelDisplay="off"
          />
          <Typography id="irritable-slider" variant="caption">
            Irritable
          </Typography>
        </div>
        <div className={classes.vertical}>
          <CustomSlider
            orientation="vertical"
            aria-label="mood"
            defaultValue={0}
            marks={marks}
            step={1}
            min={0}
            max={10}
            valueLabelDisplay="off"
          />
          <Typography id="mood-slider" variant="caption">
            Mood
          </Typography>
        </div>
      </div>
    </div>
  );
}
