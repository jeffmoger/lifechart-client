import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useAuth } from '../context/auth';

const useStyles = makeStyles((theme) => ({
  menuDesktop: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
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
        <Button component={Link} to="/charts" size="small">
          My Charts
        </Button>
        <Button component={Link} to="/settings" size="small">
          Settings
        </Button>
        <Button
          component={Link}
          to="/login"
          onClick={isAuthenticated.authTokens ? logOut : null}
          size="small"
        >
          Logout
        </Button>
      </>
    );
  };
  const MenuNoAuth = () => {
    return (
      <>
        <Button component={Link} to="/demo" size="small">
          Demo
        </Button>
        <Button component={Link} to="/login" size="small">
          Login
        </Button>
      </>
    );
  };
  return (
    <div className={classes.menuDesktop}>
      {isAuthenticated.authTokens ? <MenuAuth /> : <MenuNoAuth />}
    </div>
  );
}
