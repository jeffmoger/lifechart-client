import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Sliders from './Sliders';
import DateTimePicker from './DateTimePicker';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '400px',
    marginTop: 50,
    marginBottom: 100,
  },
});

const sliders = [
  {
    name: 'Weight',
    value: 0,
  },
];

export default function DataEntryWeight({
  handleSliderChange,
  profile,
  setValues,
  setTimestamp,
}) {
  const classes = useStyles();
  const { weight: savedWeight } = profile;
  const [weight, start, stop, marks] = range(currentWeight());

  useEffect(() => {
    setValues(sliders);
  }, [setValues]);

  function currentWeight() {
    if (savedWeight) {
      return savedWeight;
    } else {
      return 76.3;
    }
  }

  function valueLabelFormat(value) {
    return value + 'kg';
  }

  function range(weight) {
    let start = weight * 10 - 20;
    let stop = weight * 10 + 20;
    let step = 1;
    var arr = [],
      b = start;
    while (b < stop) {
      let nextVal = (b += step) / 10;
      let obj;
      if (Number(nextVal) === Number(weight)) {
        obj = { value: nextVal, label: nextVal.toString().concat(' kg') };
      } else {
        obj = { value: nextVal };
      }
      arr.push(obj);
    }
    return [weight, start / 10, stop / 10, arr];
  }

  return (
    <div>
      <Typography id="weight-slider" variant="h5" align="center" gutterBottom>
        Adjust your current weight.
      </Typography>
      <div className={classes.container}>
        <Sliders
          key="weight"
          name="Weight"
          marks={marks}
          min={start}
          max={stop}
          step={0.1}
          handleSliderChange={handleSliderChange}
          defaultValue={Number(weight)}
          valueLabelDisplay="on"
          valueLabelFormat={valueLabelFormat}
        />
      </div>
      <DateTimePicker setTimestamp={setTimestamp} />
    </div>
  );
}
