import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles((theme) => ({
  table: {
    marginBottom: 30,
  },
  delete: {
    padding: theme.spacing(0),
  },
}));

export default function DisplaySymptomList(props) {
  const classes = useStyles();
  const { displayList, handleSwitch, handleDelete } = props;
  React.useEffect(() => {
    console.log(displayList);
  }, [displayList]);

  return (
    <TableContainer component={'div'}>
      {displayList.length > 0 ? (
        <Table className={classes.table} aria-label="symptom table">
          <TableHead>
            <TableRow>
              <TableCell>Symptom Name</TableCell>
              <TableCell align="right">Show</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayList.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.symptom}
                </TableCell>
                <TableCell align="right">
                  <Switch
                    id={row.id}
                    size="small"
                    color="primary"
                    checked={row.show}
                    onClick={handleSwitch}
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    name={row.id}
                    data-value={row.active}
                    edge="start"
                    className={classes.delete}
                    aria-label="delete"
                    onClick={handleDelete}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : null}
    </TableContainer>
  );
}
