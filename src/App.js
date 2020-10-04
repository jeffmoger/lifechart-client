import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import './App.css';

import PrivateRoute from './components/PrivateRoute';
//import Nav from './components/Nav'
import Home from './pages/Home';
import Settings from './pages/Settings';
import Login from './pages/Login';
import About from './pages/About';
import Demo from './pages/Demo';
import { AuthContext } from './context/auth';
import AppBar from './components/AppBar';

function App() {
  const existingTokens = JSON.parse(localStorage.getItem('tokens'));
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const setTokens = (data) => {
    localStorage.setItem('tokens', JSON.stringify(data));
    setAuthTokens(data);
  };

  const darkTheme = createMuiTheme({
    palette: {
      primary: {
        main: '#5D4E8C',
      },
      type: 'dark',
    },
    typography: {
      fontFamily: [
        'Raleway',
        'HelveticaNeue',
        '"Helvetica Neue"',
        'Helvetica',
        'Arial',
        'sans-serif',
      ].join(','),
    },
  });

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Router>
          <AppBar />
          <Container fixed>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/about" component={About} />
            <Route path="/demo" component={Demo} />
            <PrivateRoute path="/settings" component={Settings} />
          </Container>
        </Router>
      </ThemeProvider>
    </AuthContext.Provider>
  );
}

export default App;
