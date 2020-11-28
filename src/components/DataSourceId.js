import React, { useState, useEffect } from 'react';

import Check from '@material-ui/icons/Check';
import { makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { getDataSourceId, saveProfile } from '../functions/apiCalls';

const useStyles = makeStyles((theme) => ({
  table: {
    marginBottom: 30,
  },
}));

export default function DataSourceId(props) {
  const classes = useStyles();
  const { token, dataSourceIds: profileDataSource } = props;
  const [dataSources, setDataSources] = useState([]);

  const saveDataSourcesToProfile = (dataSources, token) => {
    let filteredDataSources = dataSources.filter((item) => item.dataDetails);
    saveProfile(token, {
      dataSourceIds: filteredDataSources,
    });
  };

  useEffect(() => {
    getDataSourceId(token).then((result) => {
      setDataSources(result);
    });
  }, [token]);

  useEffect(() => {
    if (dataSources.length > 0) {
      if (profileDataSource) {
        if (profileDataSource.length !== dataSources.length) {
          saveDataSourcesToProfile(dataSources, token);
        }
      }
      if (!profileDataSource) saveDataSourcesToProfile(dataSources, token);
    }
  }, [profileDataSource, dataSources, token]);

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
