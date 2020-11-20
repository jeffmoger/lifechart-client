import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth } from '../context/auth';

const useStyles = makeStyles((theme) => ({
  menuDesktop: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  div: {
    marginLeft: 20,
  },
  link: {
    color: '#FFFFFF',
    textDecoration: 'none',
  },
}));

export default function MenuDesktop(props) {
  const classes = useStyles();
  const isAuthenticated = useAuth();
  const { setAuthTokens } = useAuth();
  function logOut(event) {
    setAuthTokens();
    window.localStorage.removeItem('tokens');
    window.localStorage.removeItem('dataSourceIds');
    window.localStorage.removeItem('fitChartData');
    window.localStorage.removeItem('itemChartData');
    event.preventDefault();
  }

  const MenuAuth = () => {
    return (
      <>
        <div className={classes.div}>
          <Link to="/charts" className={classes.link}>
            My Charts
          </Link>
        </div>
        <div className={classes.div}>
          <Link to="/settings" className={classes.link}>
            Settings
          </Link>
        </div>
        <div className={classes.div}>
          <Link
            to="/login"
            className={classes.link}
            onClick={isAuthenticated.authTokens ? logOut : null}
          >
            Logout
          </Link>
        </div>
      </>
    );
  };
  const MenuNoAuth = () => {
    return (
      <>
        <div className={classes.div}>
          <Link to="/demo" className={classes.link}>
            Demo
          </Link>
        </div>
        <div className={classes.div}>
          <Link to="/login" className={classes.link}>
            Login
          </Link>
        </div>
      </>
    );
  };
  return (
    <div className={classes.menuDesktop}>
      {isAuthenticated.authTokens ? <MenuAuth /> : <MenuNoAuth />}
    </div>
  );
}
