import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../context/auth';

function PrivateRoute({ component: Component, ...rest }) {
  const isAuthenticated = useAuth();

  if (isAuthenticated.authTokens) console.log('isAuthenticated');
  if (!isAuthenticated.authTokens) console.log('Not authenticated');

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated.authTokens ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

export default PrivateRoute;
