import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Logo from '../components/Logo';
import Intro from '../components/Intro';
import MenuHomepage from '../components/MenuHomepage';
import ChartForHomePage from '../charts/ChartForHomePage';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
  logo: {
    marginTop: -20,
    marginBottom: -20,
  },
  link: {
    color: () =>
      theme.palette.type === 'light'
        ? theme.palette.secondary.dark
        : theme.palette.secondary.main,
    textDecoration: () =>
      theme.palette.type === 'light' ? 'underline' : 'none',
  },
  slogan: {
    marginBottom: 20,
    marginTop: 20,
    //color: () => (theme.palette.type === 'light' ? '#5D4E8C' : '#8884d8'),
  },
  longtext: {
    height: 1000,
  },
}));

const headProps = (type) => {
  const theme = {
    light: {
      start: 'rgb(220, 220, 220)',
      end: 'rgb(250, 250, 250)',
    },
    dark: {
      start: 'rgb(48, 48, 48)',
      end: 'rgb(36, 36, 36)',
    },
  };
  if (type === 'light') return [theme.light.start, theme.light.end];
  if (type === 'dark') return [theme.dark.start, theme.dark.end];
};

const logoProps = (theme) => {
  const type = theme.palette.type;
  let lifeFill;
  type === 'light' ? (lifeFill = '#5D4E8C') : (lifeFill = '#FFF');
  return {
    lifeFill,
    chartFill: '#82CA9D',
    width: 390 / 1.8,
    height: 120 / 1.8,
  };
};

const chartProps = (theme) => {
  const type = theme.palette.type;
  let fill;
  let stroke;
  type === 'light' ? (fill = '#dcdcdc') : (fill = '#303030');
  type === 'light' ? (stroke = '#5D4E8C') : (stroke = '#8884d8');
  return {
    stroke,
    fill,
  };
};

const initHeadColor = (type) => {
  let arr = headProps(type);
  return arr[0];
};

const generateData = (min, max) => {
  const arr = [];
  const chartLength = 5;
  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  var i;
  for (i = 0; i < chartLength; i++) {
    arr.push({ a: 1, b: 10 });
    arr.push({ a: getRandomIntInclusive(min, max), b: 10 });
  }
  arr.push({ a: 1, b: 10 });
  return arr;
};

export default function Home(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [data, setData] = useState(() => generateData(1, 1));
  const [showText, setShowText] = useState(false);
  const [textFlag, setTextFlag] = useState(false);
  const [subtitle, setSubtitle] = useState(false);
  const [headArr, setHeadArr] = useState(() => headProps(theme.palette.type));
  const [headColor, setHeadColor] = useState(() =>
    initHeadColor(theme.palette.type)
  );

  useEffect(() => {
    console.log(`TYPE: ${theme.palette.type}`);
    setHeadColor(initHeadColor(theme.palette.type));
    setHeadArr(headProps(theme.palette.type));
  }, [theme.palette.type]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(generateData(2, 10));
      setSubtitle(true);
      setTextFlag(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (textFlag) {
      const timer = setTimeout(() => {
        setShowText(true);

        const sleep = (milliseconds) => {
          return new Promise((resolve) => setTimeout(resolve, milliseconds));
        };

        const fadeIn = async () => {
          const parseRGB = (rgb) => {
            return rgb.substring(
              rgb.lastIndexOf('(') + 1,
              rgb.lastIndexOf(')')
            );
          };

          const rgbStart = parseRGB(headArr[0]);
          const rgbEnd = parseRGB(headArr[1]);

          const rgbStartArr = rgbStart.split(',');
          const rgbEndArr = rgbEnd.split(',');

          const start = rgbStartArr[0];
          const end = rgbEndArr[0];
          //console.log(`start: ${start}`);
          //console.log(`end: ${end}`);
          let newRGB;

          if (start < end) {
            let sleepLength = Math.round(500 / (end - start));
            console.log(`sleep: ${sleepLength}`);
            for (let i = start; i <= end; i++) {
              await sleep(sleepLength);
              newRGB = `rgb(${i}, ${i}, ${i})`;
              setHeadColor(newRGB);
            }
          }
          if (start > end) {
            let sleepLength = Math.round(500 / (start - end));
            //console.log(`sleep: ${sleepLength}`);
            for (let i = start; i >= end; i--) {
              await sleep(sleepLength);
              newRGB = `rgb(${i}, ${i}, ${i})`;
              setHeadColor(newRGB);
            }
          }
          //console.log(`newRGB: ${newRGB}`);
        };
        fadeIn();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [headArr, textFlag, theme.palette.type]);

  useEffect(() => {
    const timer = setInterval(() => {
      setData(generateData(2, 10));
    }, 10000);
    setTimeout(() => {
      clearInterval(timer);
    }, 500000);
  }, []);

  return (
    <>
      <header style={{ textAlign: 'left', backgroundColor: headColor }}>
        <Container maxWidth="md" style={{ height: 30 }}>
          {showText && <MenuHomepage />}
        </Container>
        <Container maxWidth="md" className={classes.logo}>
          <Logo logoProps={logoProps(theme)} />
        </Container>

        <div
          className={`homechart-${theme.palette.type}`}
          style={{ backgroundColor: headColor }}
        >
          <ChartForHomePage data={data} colors={chartProps(theme)} />
        </div>
      </header>

      <main className={`homechart-${theme.palette.type}`}>
        <Container maxWidth="md">
          <Fade in={subtitle} timeout={2000}>
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              className={classes.slogan}
              align="left"
            >
              The smart way to chart your health and fitness data
            </Typography>
          </Fade>
          {showText ? (
            <Intro toggleTheme={props.toggleTheme} fade={true} />
          ) : (
            <div className={classes.longtext} />
          )}
        </Container>
      </main>
    </>
  );
}
