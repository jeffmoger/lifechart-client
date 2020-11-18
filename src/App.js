import React, { useState, useEffect, useMemo } from 'react';
import {
  //BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from 'react-router-dom';
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
import MyCharts from './pages/MyCharts';
import AppBar from './components/AppBar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const existingTokens = JSON.parse(localStorage.getItem('tokens'));
  const themePreference = JSON.parse(localStorage.getItem('prefersDarkMode'));
  const [authTokens, setAuthTokens] = useState(existingTokens);
  const [prefersDarkMode, setDarkMode] = useState(themePreference);
  const [pageView, setPageView] = useState();

  function usePathName() {
    const location = useLocation();
    useEffect(() => {
      setPageView(location.pathname);
    }, [location]);
  }

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
        overrides: {
          MuiCssBaseline: {
            '@global': {
              html: {
                WebkitFontSmoothing: 'auto',
              },
            },
          },
        },
      }),
    [prefersDarkMode]
  );

  usePathName();

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ScrollToTop />
        <article>
          {pageView !== '/' && <AppBar toggleTheme={toggleTheme} />}
          <Switch>
            <Route exact path="/">
              <Home toggleTheme={toggleTheme} />
            </Route>
            <Route path="/charts" component={MyCharts} />
            <Route path="/login" component={Login} />
            <Route path="/privacy" component={Privacy} />
            <Route path="/terms" component={Terms} />
            <Route path="/register" component={Register} />
            <Route path="/about" component={About} />
            <Route path="/demo" component={Demo} />
            <Route path="/auth/google/redirect" component={Auth} />
            <PrivateRoute path="/settings" component={Settings} />
            <Route component={NotFound} />
          </Switch>
          <Footer toggleTheme={toggleTheme} />
        </article>
      </ThemeProvider>
    </AuthContext.Provider>
  );
}

export default App;
