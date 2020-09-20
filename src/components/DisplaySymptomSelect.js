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

const useStyles = makeStyles((theme) => ({
  table: {
    marginBottom: 30,
  },
  delete: {
    padding: theme.spacing(0),
  },
  notes: {
    width: '100%',
  },
}));

export default function DisplaySymptomSelect(props) {
  const classes = useStyles();
  const { displayList, handleCheckmark, handleNotes } = props;
  const [list, setList] = useState([]);

  useEffect(() => {
    const newList = displayList.filter((item) => item.selected === true);
    newList.length > 0 ? setList(newList) : setList(displayList);
  }, [displayList]);

  useEffect(() => {
    //console.log(list);
  }, [list]);

  return (
    <TableContainer component={'div'}>
      {list.length > 0 ? (
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
      {list.length === 1 ? (
        <TextField
          id="notes"
          label="Notes"
          multiline
          rows={6}
          variant="outlined"
          className={classes.notes}
          onChange={handleNotes}
        />
      ) : null}
    </TableContainer>
  );
}
