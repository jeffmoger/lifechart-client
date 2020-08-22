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
            handleSliderChange={handleSliderChange}
            defaultValue={slider.value}
          />
        ))}
      </div>
    </div>
  );
}
