import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/auth';
import IconButton from '@material-ui/core/IconButton';
import { Icon } from '@iconify/react';
import outlineArrowDropDown from '@iconify-icons/ic/outline-arrow-drop-down';

const useStyles = makeStyles((theme) => ({
  menuDiv: {
    display: 'flex',
    justifyContent: 'flex-end',
    position: 'relative',
    zIndex: 111,
  },
  item: {
    marginRight: 0,
  },
  itemGroupOff: {
    marginTop: -35,
    transition: 'margin-top .5s',
  },
  itemGroupOn: {
    marginTop: 5,
    transition: 'margin-top .2s',
    transitionTimingTunction: 'ease-out',
  },

  linktop: {
    color: '#999',
    textDecoration: 'none',
    fontSize: '90%',
    fontWeight: 400,
    marginRight: 10,
    '&:hover, &:focus': {
      color: '#5D4E8C',
    },
  },
}));

export default function MenuHomepage() {
  const classes = useStyles();
  const isAuthenticated = useAuth();
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(!open);
  }

  return (
    <div className={classes.menuDiv}>
      {isAuthenticated.authTokens && (
        <>
          <div
            className={`${classes.item} ${
              open ? classes.itemGroupOn : classes.itemGroupOff
            }`}
          >
            <Link to="/charts" className={classes.linktop}>
              my charts
            </Link>
            <Link to="/settings" className={classes.linktop}>
              settings
            </Link>
          </div>
          <div className={classes.item}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              aria-label="menu"
              onClick={handleOpen}
              size="small"
            >
              <Icon
                icon={outlineArrowDropDown}
                width="24"
                height="24"
                flip={open ? 'vertical' : ''}
              />
            </IconButton>
          </div>
        </>
      )}
    </div>
  );
}
