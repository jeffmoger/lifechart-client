import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Logo from './Logo.js';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SideDrawer from './SideDrawer';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MenuDesktop from './MenuDesktop';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: '#5D4E8C',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const anchor = 'left';

export default function ButtonAppBar(props) {
  const classes = useStyles();
  const [toggleState, setToggleState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setToggleState({ ...toggleState, [anchor]: open });
  };
  const logoProps = {
    lifeFill: '#FFFFFF',
    chartFill: '#82CA9D',
    width: 130 * 1.3,
    height: 40 * 1.3,
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent">
        <Container maxWidth="md">
          <Toolbar disableGutters>
            <Box display="flex" flexGrow={1}>
              {matches ? null : (
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="menu"
                  onClick={toggleDrawer(anchor, true)}
                >
                  <MenuIcon />
                </IconButton>
              )}

              <div className={classes.logo}>
                <Link to="/">
                  <Logo logoProps={logoProps} />
                </Link>
              </div>
            </Box>
            {matches && <MenuDesktop />}
          </Toolbar>
        </Container>
      </AppBar>
      {matches ? null : (
        <SideDrawer
          anchor={anchor}
          toggleState={toggleState}
          toggleDrawer={toggleDrawer}
        />
      )}
    </div>
  );
}
