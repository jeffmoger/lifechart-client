import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Logo from '../components/Logo';
import Intro from '../components/Intro';
import MenuHomepage from '../components/MenuHomepage';
import ChartForHomePage from '../charts/ChartForHomePage';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  logo: {
    marginTop: -20,
    marginBottom: -20,
    display: 'flex',
    alignItems: 'center',
  },
  smart: {
    color: theme.palette.primary.light,
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
    width: 390 / 2.1,
    height: 120 / 2.1,
  };
};

const chartProps = (theme) => {
  const type = theme.palette.type;
  let fill;
  let stroke;
  type === 'light' ? (fill = '#dcdcdc') : (fill = '#303030');
  //type === 'light' ? (stroke = '#5D4E8C') : (stroke = '#8884d8');
  type === 'light'
    ? (stroke = '#5D4E8C')
    : (stroke = theme.palette.primary.light);
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
  const [signin, setSignin] = useState(false);
  const [headArr, setHeadArr] = useState(() => headProps(theme.palette.type));
  const [headColor, setHeadColor] = useState(() =>
    initHeadColor(theme.palette.type)
  );

  useEffect(() => {
    setHeadColor(initHeadColor(theme.palette.type));
    setHeadArr(headProps(theme.palette.type));
    setTextFlag(true);
  }, [theme.palette.type]);
  useEffect(() => {
    if (textFlag) {
      const timer = setTimeout(() => {
        setSubtitle(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [textFlag]);
  useEffect(() => {
    if (subtitle) {
      const timer = setTimeout(() => {
        setShowText(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [subtitle]);
  useEffect(() => {
    if (showText) {
      const timer = setTimeout(() => {
        setSignin(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showText]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(generateData(2, 10));
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (textFlag) {
      const timer = setTimeout(() => {
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
          <div style={{ flexGrow: 1 }}>
            <Logo logoProps={logoProps(theme)} />
          </div>
          <div style={{ width: 120, marginRight: 20 }}>
            {signin && (
              <Fade in={signin} timeout={1000}>
                <Button
                  component={Link}
                  to="/login"
                  className={classes.button}
                  size="small"
                >
                  Sign In
                </Button>
              </Fade>
            )}
          </div>
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
          <Fade in={subtitle} timeout={1000}>
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              className={classes.slogan}
              align="left"
            >
              The <span className={classes.smart}>smart</span> way to chart your
              health and fitness data
            </Typography>
          </Fade>
        </Container>
        <Container maxWidth={false} disableGutters>
          {showText ? (
            <>
              <Intro toggleTheme={props.toggleTheme} fade={true} />
            </>
          ) : (
            <div className={classes.longtext} />
          )}
        </Container>
      </main>
    </>
  );
}
