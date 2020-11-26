import React, { useEffect } from 'react';
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

const sliders = [
  {
    name: 'Energy',
    value: 0,
  },
  {
    name: 'Pleasantness',
    value: 0,
  },
];

const marks = () => {
  const marks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return marks.map((item) => {
    return { value: item };
  });
};

export default function DataEntryMood({ handleSliderChange, setValues }) {
  const classes = useStyles();
  useEffect(() => {
    setValues(sliders);
  }, [setValues]);

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
            marks={marks()}
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
