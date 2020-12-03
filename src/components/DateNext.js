import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

export default function DateNext({ nextDateRange, nextDisabled }) {
  if (!nextDisabled) nextDisabled = false;
  const handleClickForward = () => {
    nextDateRange();
  };
  return (
    <IconButton
      color="inherit"
      aria-label="next"
      onClick={handleClickForward}
      disabled={nextDisabled}
      size="small"
    >
      <ArrowForwardIosIcon />
    </IconButton>
  );
}
