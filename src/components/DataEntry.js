import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import DataEntryMood from './DataEntryMood';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  dialogPaper: {
    minHeight: '70vh',
    maxHeight: '70vh',
    minWidth: 400,
    backgroundColor: '#111111',
  },
  dialogPaper2: {
    backgroundColor: '#111111',
  },
  button: {
    marginRight: 30,
    marginBottom: 40,
  },
});

export default function DataEntry({ open, handleDialogClose, category }) {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  let paperClass;
  if (!fullScreen) {
    paperClass = { paper: classes.dialogPaper };
  } else {
    paperClass = { paper: classes.dialogPaper2 };
  }

  const handleClose = () => {
    handleDialogClose();
  };
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disableScrollLock={true}
        classes={paperClass}
      >
        <DialogTitle id="alert-dialog-title"></DialogTitle>
        <DialogContent>
          {category === 'Mood' ? <DataEntryMood /> : null}
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleClose}
            color="primary"
            autoFocus
            className={classes.button}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
