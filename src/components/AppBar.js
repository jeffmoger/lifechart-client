import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Logo from './Logo.js';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SideDrawer from './SideDrawer';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    //marginTop: 50,
  },
  container: {
    //maxWidth: 870,
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
      <AppBar position="static">
        <Container disableGutters maxWidth="md">
          <Toolbar>
            <Box display="flex" flexGrow={1}>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(anchor, true)}
              >
                <MenuIcon />
              </IconButton>
              <Link to="/">
                <Logo logoProps={logoProps} className={classes.logo} />
              </Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <SideDrawer
        anchor={anchor}
        toggleState={toggleState}
        toggleDrawer={toggleDrawer}
      />
    </div>
  );
}
