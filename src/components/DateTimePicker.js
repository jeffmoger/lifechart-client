import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  DatePicker,
  TimePicker,
} from '@material-ui/pickers';
import IconButton from '@material-ui/core/IconButton';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { dateMillis } from '../functions/dateFunctions';

const useStyles = makeStyles({
  datetimeWrap: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginLeft: 30,
  },
  date: {
    paddingRight: 5,
    width: 150,
  },
  time: {
    paddingLeft: 5,
    width: 150,
  },
  iconDiv: {
    position: 'absolute',
    bottom: 45,
    left: 45,
  },
});

function DateTimeFields(props) {
  const { selectedDate, handleDateChange, disableTime } = props;
  const classes = useStyles();
  return (
    <>
      {disableTime ? (
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <div className={classes.date}>
            <DatePicker
              value={selectedDate}
              onChange={handleDateChange}
              InputProps={{ disableUnderline: false }}
              disableFuture={true}
            />
          </div>
        </MuiPickersUtilsProvider>
      ) : (
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <div className={classes.date}>
            <DatePicker
              value={selectedDate}
              onChange={handleDateChange}
              InputProps={{ disableUnderline: false }}
              disableFuture={true}
            />
          </div>
          <div className={classes.time}>
            <TimePicker
              value={selectedDate}
              onChange={handleDateChange}
              InputProps={{ disableUnderline: false }}
            />
          </div>
        </MuiPickersUtilsProvider>
      )}
    </>
  );
}

export default function DateTimePicker(props) {
  const classes = useStyles();
  const { setTimestamp, disableTime } = props;
  const [showCal, setShowCal] = useState(false);
  const [selectedDate, handleDateChange] = useState(new Date());
  function toggleCalendar() {
    setShowCal(!showCal);
  }
  useEffect(() => {
    setTimestamp(dateMillis(selectedDate));
  }, [selectedDate, setTimestamp]);
  return (
    <div className={classes.datetimeWrap}>
      <div className={classes.iconDiv}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="calendar"
          className={classes.calButton}
          onClick={toggleCalendar}
        >
          <ScheduleIcon />
        </IconButton>
      </div>
      {showCal && (
        <DateTimeFields
          selectedDate={selectedDate}
          handleDateChange={handleDateChange}
          disableTime={disableTime}
        />
      )}
    </div>
  );
}
