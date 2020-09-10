import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../context/auth';
import HomeCharts from '../components/HomeCharts';
//import HomeDemo from '../components/HomeDemo';

export default function Home() {
  const isAuthenticated = useAuth();
  const [profile, setProfile] = useState('');

  useEffect(() => {
    async function getProfile(id, token) {
      const r = await fetch(`${process.env.REACT_APP_API}/api/users/read`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          authorization: 'Token ' + token,
          id: id,
        },
      });
      const response = await r.json();
      return response;
    }
    if (isAuthenticated.authTokens) {
      const { id, token } = isAuthenticated.authTokens;
      getProfile(id, token).then((result) => setProfile(result));
    }
  }, [isAuthenticated.authTokens]);

  return (
    <main>
      {isAuthenticated.authTokens ? (
        <HomeCharts authTokens={isAuthenticated.authTokens} profile={profile} />
      ) : (
        <Redirect to={'/about'} />
      )}
    </main>
  );
}
