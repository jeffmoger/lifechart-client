import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import DataEntryMood from './DataEntryMood';

import { makeStyles } from '@material-ui/core/styles';

const getStateDefault = (category) => {
  if (category === 'Mood') {
    return [
      {
        name: 'Energy',
        value: 0,
      },
      {
        name: 'Irritable',
        value: 0,
      },
      {
        name: 'Mood',
        value: 0,
      },
    ];
  } else {
    return [];
  }
};

const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    minHeight: '70vh',
    maxHeight: '70vh',
    minWidth: 400,
    backgroundColor: '#111111',
  },
  dialogPaper2: {
    backgroundColor: '#111111',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  button: {
    marginBottom: 40,
    marginRight: 40,
  },
}));

export default function DataEntry({
  open,
  handleDialogClose,
  category,
  closeSpeedDial,
  refreshAfterSubmit,
}) {
  const classes = useStyles();
  const [values, setValues] = useState([]);
  const [status, setStatus] = useState(0);
  const [disabled, setDisabled] = useState(true);

  const { token } = JSON.parse(localStorage.getItem('tokens'));
  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  let paperClass;
  if (!fullScreen) {
    paperClass = { paper: classes.dialogPaper };
  } else {
    paperClass = { paper: classes.dialogPaper2 };
  }
  const handleSliderChange = (id, newValue) => {
    const sliderIndex = values.findIndex((slider) => slider.name === id);
    let newArray = [...values];
    newArray[sliderIndex] = { ...newArray[sliderIndex], value: newValue };
    setValues(newArray);
    setDisabled(false);
  };

  useEffect(() => {
    setValues(getStateDefault(category));
  }, [category]);

  useEffect(() => {
    if (status === 3) {
      refreshAfterSubmit();
    }
  }, [refreshAfterSubmit, status]);

  const handleClose = () => {
    handleDialogClose();
  };

  function handleSubmit(event, values) {
    event.preventDefault();
    setStatus(2);
    submitRecord(values, token).then((response) => {
      if (response.id) {
        setStatus(3);
        console.log(response);
      } else {
        //REMOVE THIS
        alert(response);
      }
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          disableScrollLock={false}
          classes={paperClass}
        >
          <DialogTitle id="alert-dialog-title"></DialogTitle>
          <DialogContent>
            {category === 'Mood' && status <= 1 ? (
              <DataEntryMood
                handleSliderChange={handleSliderChange}
                sliders={getStateDefault(category)}
              />
            ) : null}
            {status === 2 ? <CircularProgress /> : null}
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={(event) => handleSubmit(event, values)}
              color="primary"
              autoFocus
              disabled={disabled}
              className={classes.button}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </div>
  );
}

async function submitRecord(state, token) {
  try {
    const r = await fetch(`${process.env.REACT_APP_API}/api/items/create`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: 'Token ' + token,
      },
      body: JSON.stringify({
        item: {
          dataTypeName: 'lifechart.mood.item',
          value: structureJSON(state),
        },
      }),
    });
    const response = await r.json();
    return response;
  } catch (err) {
    return err;
  }
}

function structureJSON(arr) {
  const newArray = arr.map((item) => {
    const newItem = {
      key: item.name,
      value: {
        intVal: item.value,
      },
    };
    return newItem;
  });
  return newArray;
}
