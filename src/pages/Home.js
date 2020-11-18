import React from 'react';
import Container from '@material-ui/core/Container';
import Logo from '../components/Logo.js';
import Intro from '../components/Intro';
import { useTheme } from '@material-ui/core/styles';

const logoProps = (theme) => {
  const type = theme.palette.type;
  let lifeFill;
  type === 'light' ? (lifeFill = '#5D4E8C') : (lifeFill = '#8884d8');
  return {
    lifeFill,
    chartFill: '#82CA9D',
    width: 390,
    height: 120,
  };
};

export default function Home(props) {
  const theme = useTheme();
  return (
    <>
      <header>
        <Container maxWidth="md">
          <Logo logoProps={logoProps(theme)} />
        </Container>
      </header>
      <main>
        <Intro toggleTheme={props.toggleTheme} />
      </main>
    </>
  );
}
