import React from 'react';
import {Link} from 'react-router-dom';
import clsx from 'clsx';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const useStyles = makeStyles({
  root: {
    color: '#FFFFFF',
  },
  list: {
    paddingTop: 50,
    width: 250,
    height: '100%',
    backgroundColor: '#333333',
  },
  fullList: {
    width: 'auto',
  },
});


export default function SideDrawer(props) {
  const classes = useStyles();

  const {toggleDrawer, anchor, toggleState } = props
  
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
        {[
          ['Home','/'],
          ['Settings','/settings'],
          ['Logout','/logout']
          ].map((text, index) => (
          <ListItem 
            button 
            key={text[0]}
            color='inherit'
            component={Link}
            to={text[1]}>
            <ListItemText primary={text[0]} />
          </ListItem>
        ))}
      </List>
    </div>
  );

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