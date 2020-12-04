import React, { useState } from 'react';
import { useAuth } from '../context/auth';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { removeProfile } from '../functions/apiCalls';

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700],
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function DeleteAccount(props) {
  const { token } = props;
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const { setAuthTokens } = useAuth();
  function logOut(event) {
    setAuthTokens();
    window.localStorage.removeItem('tokens');
    window.localStorage.removeItem('dataSourceIds');
    window.localStorage.removeItem('fitChartData');
    window.localStorage.removeItem('itemChartData');
    event.preventDefault();
    removeProfile(token);
  }

  const handleClickDeleteOpen = () => {
    setOpen(true);
  };

  const handleDeleteClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button color="primary" onClick={handleClickDeleteOpen}>
        Delete Account
      </Button>
      <Dialog
        open={open}
        onClose={handleDeleteClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Delete Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Deleting your account will permanently remove your profile and all
            saved data from our system. This action cannot be reversed. Are you
            sure you want to continue?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} variant="outlined">
            Cancel
          </Button>
          <ColorButton
            variant="contained"
            color="primary"
            className={classes.margin}
            onClick={logOut}
          >
            Delete My Account
          </ColorButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
