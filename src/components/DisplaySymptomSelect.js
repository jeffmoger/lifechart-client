import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
//import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Zoom from '@material-ui/core/Zoom';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '400px',
    marginTop: 50,
  },
  table: {
    marginBottom: 30,
  },
  delete: {
    padding: theme.spacing(0),
  },
  notes: {
    width: '100%',
  },
  sliderDiv: {
    width: 300,
    marginLeft: 20,
    marginBottom: 25,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

const marks = () => {
  const marks = [0, 1, 2, 3, 4, 5];
  return marks.map((mark) => {
    let item = { value: mark };
    if (mark === 1) {
      item.label = 'Mild';
    }
    if (mark === 5) {
      item.label = 'Severe';
    }
    return item;
  });
};

export default function DisplaySymptomSelect(props) {
  const classes = useStyles();
  const {
    displayList,
    handleCheckmark,
    handleNotes,
    handleSliderChange,
    symptom,
  } = props;
  const [list, setList] = useState([]);

  useEffect(() => {
    const newList = displayList.filter((item) => item.selected === true);
    newList.length > 0 ? setList(newList) : setList(displayList);
  }, [displayList]);

  return (
    <>
      <Typography id="weight-slider" variant="h5" align="center" gutterBottom>
        {symptom ? symptom.name : 'Select a symptom.'}
      </Typography>

      <TableContainer component={'div'}>
        {!symptom ? (
          <Table className={classes.table} aria-label="symptom table">
            <TableBody>
              {list.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.symptom}
                  </TableCell>
                  <TableCell align="right">
                    <Checkbox
                      id={row.id}
                      color="primary"
                      onClick={handleCheckmark}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : null}
        {symptom ? (
          <Zoom in={true}>
            <div>
              <div className={classes.sliderDiv}>
                <Typography
                  id="discrete-slider"
                  variant="body1"
                  align="center"
                  gutterBottom
                >
                  Severity
                </Typography>
                <Slider
                  defaultValue={symptom.value}
                  aria-labelledby="severity"
                  name={symptom.name}
                  min={0}
                  max={5}
                  step={1}
                  valueLabelDisplay="auto"
                  marks={marks()}
                  onChangeCommitted={(event, value) =>
                    handleSliderChange(symptom.name, value)
                  }
                />
              </div>

              <TextField
                id="notes"
                label="Notes"
                multiline
                rows={4}
                variant="outlined"
                className={classes.notes}
                onChange={handleNotes}
              />
            </div>
          </Zoom>
        ) : null}
      </TableContainer>
    </>
  );
}
