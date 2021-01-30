import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-188411759-1');
ReactGA.pageview(window.location.pathname + window.location.search);

ReactDOM.render(
  <React.Fragment>
    <Router>
      <App />
    </Router>
  </React.Fragment>,
  document.getElementById('root')
);
