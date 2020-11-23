import React from 'react';
import { Link } from 'react-router-dom';
import ToggleThemeColor from '../components/ToggleThemeColor';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  link: {
    color: () =>
      theme.palette.type === 'light'
        ? theme.palette.primary.light
        : theme.palette.secondary.light,
    textDecoration: 'none',
  },
  footer: {
    backgroundColor: () => (theme.palette.type === 'light' ? '#EEE' : '$333'),
    borderTop: () =>
      theme.palette.type === 'light' ? '1px solid #FFF' : '1px solid $444',
  },
}));

export default function Footer(props) {
  const classes = useStyles();
  const { toggleTheme } = props;
  return (
    <footer className={classes.footer}>
      <div>
        <Link to="/privacy" className={classes.link}>
          privacy
        </Link>
      </div>
      <div>
        <ToggleThemeColor size="20" toggleTheme={toggleTheme} />
      </div>
      <div>
        <Link to="/terms" className={classes.link}>
          terms
        </Link>
      </div>
    </footer>
  );
}
