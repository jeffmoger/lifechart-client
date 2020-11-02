import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';

import { useAuth } from '../context/auth';

export default function Auth(props) {
  const stringValues = queryString.parse(props.location.search);
  const [googleCode, setGoogleCode] = useState('');
  const [status, setStatus] = useState(0);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const { setAuthTokens } = useAuth();

  useEffect(() => {
    if (stringValues.code) {
      setGoogleCode(stringValues.code);
    }
  }, [stringValues.code]);

  useEffect(() => {
    const getUser = async () => {
      return await google_login_auth(googleCode);
    };
    if (googleCode && status === 0) {
      getUser().then((response) => {
        setStatus(1);
        if (response.user) {
          setAuthTokens(response.user);
          setLoggedIn(true);
          console.log(response);
        }
      });
    }
  }, [googleCode, setAuthTokens, status]);

  if (!isLoggedIn) {
    return <div>Checking......</div>;
  } else {
    return <Redirect to={'/settings'} />;
  }
}

async function google_login_auth(code) {
  try {
    const r = await fetch(
      `${process.env.REACT_APP_API}/api/google_login_auth`,
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          code: code,
        },
      }
    );
    return await r.json();
  } catch (err) {
    console.log(err);
  }
}
