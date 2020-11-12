import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import './App.css';

import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Demo from './pages/Demo';
import Auth from './pages/Auth';
import NotFound from './components/NotFound';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import { AuthContext } from './context/auth';
import AppBar from './components/AppBar';

function App() {
  const existingTokens = JSON.parse(localStorage.getItem('tokens'));
  const themePreference = JSON.parse(localStorage.getItem('prefersDarkMode'));
  const [authTokens, setAuthTokens] = useState(existingTokens);
  const [prefersDarkMode, setDarkMode] = useState(themePreference);

  const setTokens = (data) => {
    localStorage.setItem('tokens', JSON.stringify(data));
    setAuthTokens(data);
  };

  const toggleTheme = () => {
    localStorage.setItem('prefersDarkMode', JSON.stringify(!prefersDarkMode));
    setDarkMode(!prefersDarkMode);
  };

  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          primary: {
            main: '#5D4E8C',
          },
          secondary: {
            main: '#82ca9d',
          },
          error: {
            main: '#f44336',
          },
          warning: {
            main: '#ff9800',
          },
          info: {
            main: '#2196f3',
          },
          success: {
            main: '#4caf50',
          },
          type: prefersDarkMode ? 'dark' : 'light',
          contrastThreshold: 3,
          tonalOffset: 0.2,
        },
      }),
    [prefersDarkMode]
  );

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <AppBar toggleTheme={toggleTheme} />
          <Container fixed>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/about" component={About} />
              <Route exact path="/privacy" component={Privacy} />
              <Route exact path="/terms" component={Terms} />
              <Route exact path="/demo" component={Demo} />
              <Route exact path="/auth/google/redirect" component={Auth} />
              <PrivateRoute exact path="/settings" component={Settings} />
              <Route component={NotFound} />
            </Switch>
          </Container>
        </Router>
      </ThemeProvider>
    </AuthContext.Provider>
  );
}

export default App;
