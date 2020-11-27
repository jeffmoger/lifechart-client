import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Sliders from './Sliders';
import {
  startTodaySeconds,
  labelHour,
  labelFormat,
} from '../functions/dateFunctions';
import DateTimePicker from './DateTimePicker';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '400px',
    marginTop: 40,
    marginBottom: 100,
  },
});

const makeDefaultValues = (start, wake) => {
  let sleepTime = start + 3600 * 3;
  let wakeTime = wake + 3600 * 1.5;
  return [
    {
      name: 'Sleep',
      value: sleepTime,
    },
    {
      name: 'Wake',
      value: wakeTime,
    },
  ];
};

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

function valueLabelFormat(value) {
  return labelFormat(value);
}

export default function DataEntryWeight({
  handleSliderChange,
  setValues,
  setTimestamp,
  timestamp,
}) {
  const classes = useStyles();
  const [start, stop, step, marks] = rangeSleep(startSleep(timestamp / 1000));
  const [wakeStart, wakeStop, wakeStep, wakeMarks] = rangeWake(
    startWake(timestamp / 1000)
  );

  useEffect(() => {
    setValues(makeDefaultValues(start, wakeStart));
  }, [setValues, start, wakeStart]);

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
          valueLabelDisplay="auto"
          valueLabelFormat={valueLabelFormat}
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
          valueLabelDisplay="auto"
          valueLabelFormat={valueLabelFormat}
        />
      </div>
      <DateTimePicker setTimestamp={setTimestamp} disableTime={true} />
    </div>
  );
}
