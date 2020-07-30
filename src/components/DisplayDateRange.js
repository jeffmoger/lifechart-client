import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

export default function DisplayDateRange({
  dateRange,
  previousDateRange,
  nextDateRange,
}) {
  const handleClickBack = () => {
    previousDateRange();
  };
  const handleClickForward = () => {
    nextDateRange();
  };
  const { 2: stringRange } = dateRange;
  return (
    <div>
      <IconButton
        color="inherit"
        aria-label="previous"
        onClick={handleClickBack}
      >
        <ArrowBackIosIcon />
      </IconButton>
      <span>{stringRange}</span>
      <IconButton
        color="inherit"
        aria-label="next"
        onClick={handleClickForward}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </div>
  );
}
