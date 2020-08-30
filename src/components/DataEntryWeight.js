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

function currentWeight() {
  //TODO: Lookup weight from profile
  const weight = '76.3';
  return weight;
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

export default function DataEntryWeight({ handleSliderChange, sliders }) {
  const classes = useStyles();
  const [weight, start, stop, marks] = range(currentWeight());

  return (
    <div>
      <Typography id="weight-slider" variant="h5" align="center" gutterBottom>
        Adjust your current weight.
      </Typography>
      <div className={classes.container}>
        {sliders.map((slider) => (
          <Sliders
            key={slider.name}
            name={slider.name}
            marks={marks}
            min={start}
            max={stop}
            step={0.1}
            handleSliderChange={handleSliderChange}
            defaultValue={Number(weight)}
          />
        ))}
      </div>
    </div>
  );
}
