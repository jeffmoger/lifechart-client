import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useCountUp } from 'react-countup';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
    width: 80,
  },
  ring: {
    width: '100%',
    textAlign: 'center',
  },
  label: {
    position: 'absolute',
    bottom: 6,
    textAlign: 'center',
    fontSize: '9px',
    width: '100%',
    paddingTop: 0,
    paddingBottom: 3,
    color: '#999',
    borderBottom: '2px solid #555555',
  },
}));

const getPercent = (score, goal) => {
  return (score / goal) * 100;
};

const scoreColor = (score) => {
  switch (true) {
    case score >= 80:
      return '#99eb47';
    case score >= 40:
      return '#e6e64c';
    case score >= 0:
      return '#eb9947';
    case score < 0:
      return '#eb4747';
    default:
      return '#7e78e2';
  }
};

const gadgetColor = (theme) => {
  const themeType = theme.palette.type;
  return {
    countUp: themeType === 'dark' ? '#EEEEEE' : '#444444',
    label: themeType === 'dark' ? '#999999' : '#666666',
  };
};

export default function GadgetDetails(props) {
  const theme = useTheme();
  const classes = useStyles();
  const { score, goal, label, disableCountUp } = props;
  const { countUp, update: hookUpdate } = useCountUp({
    end: score,
    duration: 1,
    delay: 0,
  });
  const [sleepTime, setSleepTime] = useState('');

  useEffect(() => {
    if (!disableCountUp) hookUpdate(score);
  }, [disableCountUp, hookUpdate, score]);

  useEffect(() => {
    if (disableCountUp) {
      const minutes = score % 60;
      const hours = (score - minutes) / 60;
      setSleepTime(`${hours}h ${Math.round(minutes)}m`);
    }
  }, [disableCountUp, score]);

  useEffect(() => {
    if (disableCountUp) console.log(score);
  }, [disableCountUp, score]);

  const size = 55;
  const stroke = scoreColor(getPercent(score, goal));
  const fontSize = 16;
  const strokeWidth = 2;
  const r = (size - strokeWidth * 2) / 2;
  //const timeLabel = (days) => {
  //  if (days === 1) return days + ' Day';
  //  if (days > 1) return days + ' Days';
  //};
  const colors = gadgetColor(theme);

  return (
    <div className={classes.container}>
      <div className={classes.ring}>
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
          <defs />
          <path fill="none" d="M0 252h417v99.333H0z" />
          <text
            x="50%"
            y="56%"
            textAnchor="middle"
            fill={colors.countUp}
            fontSize={fontSize}
          >
            {disableCountUp ? sleepTime : countUp}
          </text>
          <g>
            <circle
              fill="none"
              stroke="none"
              strokeWidth={strokeWidth}
              cx="50%"
              cy="50%"
              r={r}
            />
          </g>
        </svg>
      </div>

      <div className={classes.label} style={{ borderBottomColor: stroke }}>
        {label}
      </div>
    </div>
  );
}
