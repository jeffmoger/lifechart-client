import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import DatePrevious from '../components/DatePrevious';
import DateNext from '../components/DateNext';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginBottom: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    background: () => (theme.palette.type === 'light' ? '#EEE' : '#424242'),
  },
  title: {
    display: 'flex',
    paddingTop: 5,
  },
  left: {
    textAlign: 'left',
    paddingLeft: 10,
  },
  right: {
    textAlign: 'right',
    paddingRight: 5,
  },
  center: {
    flexGrow: 1,
  },
  chartContainer: {
    height: '350px',
    paddingLeft: 10,
    paddingRight: 10,
  },
  gadgetWrap: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  },
}));

export default function ChartWrap(props) {
  const classes = useStyles();
  const theme = useTheme();
  const {
    nextDateRange,
    nextDisabled,
    previousDateRange,
    previousDisabled,
  } = props.functions;
  const { chart, gadgets } = props;
  return (
    <Paper component="div" className={classes.paper}>
      <div className={`${theme.palette.type + '-'}chartContainer`}>
        <div className={classes.title}>
          <div className={classes.left}>
            <DatePrevious
              previousDateRange={previousDateRange}
              previousDisabled={previousDisabled}
            />
          </div>
          <div className={classes.center}>
            <Typography variant="h6" component="h2" align="center">
              {props.title}
            </Typography>
          </div>
          <div className={classes.right}>
            <DateNext
              nextDateRange={nextDateRange}
              nextDisabled={nextDisabled}
            />
          </div>
        </div>
        <div className={classes.chartContainer}>{chart}</div>
        {gadgets && <div className={classes.gadgetWrap}>{gadgets}</div>}
      </div>
    </Paper>
  );
}
