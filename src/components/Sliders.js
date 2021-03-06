import React from 'react';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import { withStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  vertical: {
    height: 280,
    flexGrow: 1,
    textAlign: 'center',
  },
  groupName: {
    marginTop: 20,
  },
}));

const CustomSlider = withStyles((theme) => ({
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
    backgroundColor: () => (theme.palette.type === 'light' ? '#EEE' : '#111'),
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
    left: -60,
    top: 1,
    fontSize: 16,
    '& *': {
      background: 'transparent',
      color: () =>
        theme.palette.type === 'light'
          ? theme.palette.primary.main
          : theme.palette.primary.light,
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
    backgroundColor: () => (theme.palette.type === 'light' ? '#EEE' : '#111'),
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
}))(Slider);

export default function Sliders({
  handleSliderChange,
  defaultValue,
  name,
  marks,
  min,
  max,
  step,
  valueLabelDisplay,
  valueLabelFormat,
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
        valueLabelDisplay={valueLabelDisplay}
        valueLabelFormat={valueLabelFormat}
        onChangeCommitted={(event, value) => handleSliderChange(name, value)}
      />
      <Typography id={name} className={classes.groupName}>
        {name}
      </Typography>
    </div>
  );
}
