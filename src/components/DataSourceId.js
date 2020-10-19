import React, { useState, useEffect } from 'react';

import Check from '@material-ui/icons/Check';
import { makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { getDataSourceId } from '../functions/apiCalls';

const useStyles = makeStyles((theme) => ({
  table: {
    marginBottom: 30,
  },
}));

export default function DataSourceId(props) {
  const classes = useStyles();
  const { token } = props;
  const [dataSources, setDataSources] = useState([]);

  useEffect(() => {
    getDataSourceId(token).then((result) => {
      setDataSources(result);
    });
  }, [token]);

  return (
    <TableContainer component={'div'}>
      {dataSources.length > 0 ? (
        <Table className={classes.table} aria-label="symptom table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Available</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataSources.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.label}
                </TableCell>
                <TableCell align="right">
                  {row.dataDetails ? <Check /> : <span>N/A</span>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : null}
    </TableContainer>
  );
}
