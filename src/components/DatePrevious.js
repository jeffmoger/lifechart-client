import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

export default function DatePrevious({ previousDateRange, previousDisabled }) {
  if (!previousDisabled) previousDisabled = false;
  const handleClickBack = () => {
    previousDateRange();
  };
  return (
    <IconButton
      color="primary"
      aria-label="previous"
      onClick={handleClickBack}
      disabled={previousDisabled}
      size="small"
    >
      <ArrowBackIosIcon />
    </IconButton>
  );
}
