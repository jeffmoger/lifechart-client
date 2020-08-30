import React from 'react';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import { withStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  vertical: {
    height: 300,
    flexGrow: 1,
    textAlign: 'center',
  },
  groupName: {
    marginTop: 25,
    fontSize: '80%',
  },
});

const CustomSlider = withStyles({
  root: {
    color: '#7c5cd6',
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
    left: -45,
    top: 1,
    '& *': {
      background: 'transparent',
      color: '#b6add1',
    },
  },
  markLabel: {
    marginLeft: 30,
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
    backgroundColor: '#111',
    height: 1,
    width: 8,
    marginLeft: -4,
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

export default function Sliders({
  handleSliderChange,
  defaultValue,
  name,
  marks,
  min,
  max,
  step,
}) {
  const classes = useStyles();
  return (
    <div className={classes.vertical}>
      <CustomSlider
        orientation="vertical"
        aria-label={name}
        defaultValue={defaultValue}
        marks={marks}
        min={min}
        max={max}
        step={step}
        valueLabelDisplay="auto"
        onChangeCommitted={(event, value) => handleSliderChange(name, value)}
      />
      <Typography id={name} className={classes.groupName}>
        {name}
      </Typography>
    </div>
  );
}
