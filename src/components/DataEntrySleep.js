import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Sliders from './Sliders';
import { startTodaySeconds, labelHour } from '../functions/dateFunctions';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '400px',
    marginTop: 50,
  },
});

const startSleep = () => {
  return startTodaySeconds() - 3600 * 4;
};
const startWake = () => {
  return startTodaySeconds() + 3600 * 6;
};

function rangeSleep(start) {
  let step = 900;
  let length = 3600 * 6;
  let stop = start + length;
  var arr = [],
    b = start;
  while (b < stop) {
    let nextVal = (b += step);
    let obj;
    let timeLabel = labelHour(nextVal);
    if (nextVal % 3600 === 0) {
      obj = { value: nextVal, label: timeLabel };
    } else {
      obj = { value: nextVal };
    }
    arr.push(obj);
  }
  return [start, stop, step, arr];
}

function rangeWake(start) {
  let step = 900;
  let length = 3600 * 6;
  let stop = start + length;
  var arr = [],
    b = start;
  while (b < stop) {
    let nextVal = (b += step);
    let obj;
    if (nextVal % 3600 === 0) {
      obj = { value: nextVal, label: labelHour(nextVal) };
    } else {
      obj = { value: nextVal };
    }
    arr.push(obj);
  }
  return [start, stop, step, arr];
}

export default function DataEntryWeight({ handleSliderChange, sliders }) {
  const classes = useStyles();
  const [start, stop, step, marks] = rangeSleep(startSleep());
  const [wakeStart, wakeStop, wakeStep, wakeMarks] = rangeWake(startWake());
  return (
    <div>
      <Typography id="sleep-slider" variant="h5" align="center" gutterBottom>
        Enter hours of sleep.
      </Typography>
      <div className={classes.container}>
        <Sliders
          name="Sleep"
          key="Sleep"
          min={start}
          max={stop}
          step={step}
          marks={marks}
          defaultValue={start + 3600 * 3}
          handleSliderChange={handleSliderChange}
        />
        <Sliders
          name="Wake"
          key="Wake"
          min={wakeStart}
          max={wakeStop}
          step={wakeStep}
          marks={wakeMarks}
          defaultValue={wakeStart + 3600 * 1.5}
          handleSliderChange={handleSliderChange}
        />
      </div>
    </div>
  );
}
