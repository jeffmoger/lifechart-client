import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useAuth } from '../context/auth';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

const menuItems = [
  ['Home', '/', true, true],
  ['My Charts', '/charts', false, true],
  ['Demo', '/demo', true, false],
  //['About', '/about', true, false],
  //['Register', '/register', true, false],
  ['Settings', '/settings', false, true],
];

const selectMenuItem = (menuItems, isAuth) => {
  if (!isAuth) return menuItems.filter((item) => item[2] === true);
  if (isAuth) return menuItems.filter((item) => item[3] === true);
};

export default function SideDrawer(props) {
  const classes = useStyles();

  const { toggleDrawer, anchor, toggleState } = props;

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {isAuthenticated.authTokens
          ? selectMenuItem(menuItems, true).map((text, index) => (
              <ListItem
                button
                key={text[0]}
                color="inherit"
                component={Link}
                to={text[1]}
              >
                <ListItemText primary={text[0]} />
              </ListItem>
            ))
          : null}
        {!isAuthenticated.authTokens
          ? selectMenuItem(menuItems, false).map((text, index) => (
              <ListItem
                button
                key={text[0]}
                color="inherit"
                component={Link}
                to={text[1]}
              >
                <ListItemText primary={text[0]} />
              </ListItem>
            ))
          : null}
        <ListItem
          button
          color="inherit"
          component={Link}
          to="/login"
          onClick={isAuthenticated.authTokens ? logOut : null}
        >
          <ListItemText
            primary={isAuthenticated.authTokens ? 'Logout' : 'Login'}
          />
        </ListItem>
      </List>
    </div>
  );

  const { setAuthTokens } = useAuth();
  const isAuthenticated = useAuth();

  function logOut(event) {
    setAuthTokens();
    window.localStorage.removeItem('tokens');
    window.localStorage.removeItem('dataSourceIds');
    window.localStorage.removeItem('fitChartData');
    window.localStorage.removeItem('itemChartData');
    event.preventDefault();
  }

  return (
    <div>
      {
        <React.Fragment key={anchor}>
          <SwipeableDrawer
            anchor={anchor}
            open={toggleState[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      }
    </div>
  );
}
