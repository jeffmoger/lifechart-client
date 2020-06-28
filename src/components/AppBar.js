import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SideDrawer from './SideDrawer';
import Container from '@material-ui/core/Container';




const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const anchor = 'left';

export default function ButtonAppBar() {
  const classes = useStyles();
  const [toggleState, setToggleState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setToggleState({ ...toggleState, [anchor]: open });
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.root}>
      <Container fixed>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer(anchor, true)} >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            LifeChart
          </Typography>
        </Toolbar>
        </Container>
      </AppBar>
      <SideDrawer anchor={anchor} toggleState={toggleState} toggleDrawer={toggleDrawer} />
    </div>
  );
}


