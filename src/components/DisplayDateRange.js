import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    //border: '1px solid #000',
    maxWidth: '960px',
  },
  item: {
    //
  },
  icon: {
    textAlign: 'center',
    flexGrow: 1,
    //border: '1px solid #666',
  },
  date: {
    textAlign: 'center',
    //color: '#CCC',
    //textShadow: '1px 1px black',
    width: '250px',
    marginTop: 5,
  },
  back: {
    textAlign: 'right',
  },
  next: {
    textAlign: 'left',
  },
}));

export default function DisplayDateRange({
  dateRange,
  previousDateRange,
  nextDateRange,
  previousDisabled,
  nextDisabled,
}) {
  const classes = useStyles();
  if (!previousDisabled) previousDisabled = false;
  if (!nextDisabled) nextDisabled = false;
  const handleClickBack = () => {
    previousDateRange();
  };
  const handleClickForward = () => {
    nextDateRange();
  };
  const { 2: stringRange } = dateRange;
  return (
    <div className={classes.container}>
      <div className={`${classes.item} ${classes.icon} ${classes.back}`}>
        <IconButton
          color="inherit"
          aria-label="previous"
          onClick={handleClickBack}
          disabled={previousDisabled}
          size="small"
        >
          <ArrowBackIosIcon />
        </IconButton>
      </div>
      <div className={`${classes.item} ${classes.date}`}>
        <Typography variant="body2" align="center">
          {stringRange}
        </Typography>
      </div>
      <div className={`${classes.item} ${classes.icon} ${classes.next}`}>
        <IconButton
          color="inherit"
          aria-label="next"
          onClick={handleClickForward}
          disabled={nextDisabled}
          size="small"
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </div>
    </div>
  );
}
