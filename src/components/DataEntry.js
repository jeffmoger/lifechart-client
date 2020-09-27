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
import DataEntryWeight from './DataEntryWeight';
import DataEntrySleep from './DataEntrySleep';
import DataEntrySymptom from './DataEntrySymptom';
import { nowMillis } from '../functions/dateFunctions';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    minHeight: 600,
    maxHeight: '80vh',
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
  buttonDiv: {
    marginRight: 30,
    marginBottom: 40,
  },
  buttonSave: {
    marginLeft: 20,
  },
  buttonClose: {
    color: '#999',
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 400,
  },
}));

export default function DataEntry({
  open,
  handleDialogClose,
  category,
  closeSpeedDial,
  refreshAfterSubmit,
  profile,
  authTokens,
}) {
  const classes = useStyles();
  const [values, setValues] = useState('');
  const [status, setStatus] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [note, setNote] = useState('');
  const { id, token } = authTokens;

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
    if (status === 3) {
      refreshAfterSubmit();
    }
  }, [refreshAfterSubmit, status]);

  useEffect(() => {
    console.log(values);
  }, [values]);

  const handleClose = () => {
    handleDialogClose();
  };

  async function updateProfile(arr) {
    let weightObj = arr.find((item) => item.name === 'Weight');
    let newObj = { weight: weightObj.value };
    await fetch(`${process.env.REACT_APP_API}/api/users/edit`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        Authorization: 'Token ' + token,
      },
      body: JSON.stringify(newObj),
    });
  }

  function handleSubmit(event, values) {
    event.preventDefault();
    setStatus(2);
    submitRecord(values, token, category, note).then((response) => {
      if (response.id) {
        if (category === 'Weight') {
          updateProfile(values);
        }
        setTimeout(function () {
          setStatus(3);
        }, 500);
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
          disableScrollLock={true}
          classes={paperClass}
        >
          <DialogTitle id="alert-dialog-title"></DialogTitle>
          <DialogContent>
            {category === 'Mood' && status <= 1 ? (
              <DataEntryMood
                handleSliderChange={handleSliderChange}
                setValues={setValues}
              />
            ) : null}
            {category === 'Weight' && status <= 1 ? (
              <DataEntryWeight
                handleSliderChange={handleSliderChange}
                profile={profile}
                setValues={setValues}
              />
            ) : null}
            {category === 'Sleep' && status <= 1 ? (
              <DataEntrySleep
                handleSliderChange={handleSliderChange}
                setValues={setValues}
              />
            ) : null}
            {category === 'Symptom' && status <= 1 ? (
              <DataEntrySymptom
                handleSliderChange={handleSliderChange}
                authTokens={authTokens}
                setValues={setValues}
                setDisabled={setDisabled}
                setNote={setNote}
              />
            ) : null}
            {status === 2 ? (
              <div className={classes.loader}>
                <CircularProgress />
              </div>
            ) : null}
          </DialogContent>
          <DialogActions>
            <div className={classes.buttonDiv}>
              <Button
                onClick={handleDialogClose}
                className={classes.buttonClose}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={(event) => handleSubmit(event, values)}
                color="primary"
                autoFocus
                disabled={disabled}
                className={classes.buttonSave}
              >
                Save
              </Button>
            </div>
          </DialogActions>
        </Dialog>
      </form>
    </div>
  );
}

async function submitRecord(state, token, category, note) {
  const dataTypeName = `lifechart.${category.toLowerCase()}.item`;
  console.log(nowMillis());
  try {
    const r = await fetch(`${process.env.REACT_APP_API}/api/items/create`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: 'Token ' + token,
      },
      body: JSON.stringify({
        item: {
          dataTypeName: dataTypeName,
          startTimeMillis: nowMillis(),
          endTimeMillis: nowMillis(),
          value: structureJSON(state),
          note: note,
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
