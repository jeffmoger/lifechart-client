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
  const { scoreArr, label, name } = props;
  const [score, goal] = scoreArr;
  const { countUp, update: hookUpdate } = useCountUp({
    end: score,
    duration: 1,
    delay: 0,
  });
  const [sleepTime, setSleepTime] = useState('');
  const [scoreRange, setScoreRange] = useState({
    green: 80,
    yellow: 40,
    orange: 0,
    red: 0,
  });

  const scoreColor = (score) => {
    switch (true) {
      case score >= scoreRange.green:
        return '#99eb47';
      case score >= scoreRange.yellow:
        return '#e6e64c';
      case score >= scoreRange.orange:
        return '#eb9947';
      case score < scoreRange.red:
        return '#eb4747';
      default:
        return '#7e78e2';
    }
  };

  useEffect(() => {
    if (name !== 'sleepGadgets') hookUpdate(score);
  }, [name, hookUpdate, score]);

  useEffect(() => {
    if (name === 'sleepGadgets') {
      setScoreRange({ green: 100, yellow: 90, orange: 85, red: 85 });
      const minutes = score % 60;
      const hours = (score - minutes) / 60;
      setSleepTime(`${hours}h ${Math.round(minutes)}m`);
    }
  }, [name, score]);

  useEffect(() => {
    if (name === 'sleepGadgets') console.log(score);
  }, [name, score]);

  const size = 55;
  const stroke = scoreColor(getPercent(score, goal));
  const fontSize = 16;
  const strokeWidth = 2;
  const r = (size - strokeWidth * 2) / 2;
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
            {name === 'sleepGadgets' ? sleepTime : countUp}
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
