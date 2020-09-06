import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Sliders from './Sliders';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '400px',
    marginTop: 50,
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

export default function DataEntryMood({ handleSliderChange, sliders }) {
  const classes = useStyles();

  return (
    <div>
      <Typography id="energy-slider" variant="h5" align="center" gutterBottom>
        How do you feel?
      </Typography>
      <div className={classes.container}>
        {sliders.map((slider) => (
          <Sliders
            key={slider.name}
            name={slider.name}
            marks={marks}
            min={0}
            max={10}
            step={1}
            handleSliderChange={handleSliderChange}
            defaultValue={slider.value}
            valueLabelDisplay="auto"
          />
        ))}
      </div>
    </div>
  );
}
