import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../context/auth';
import HomeCharts from '../components/HomeCharts';
//import HomeDemo from '../components/HomeDemo';

export default function Home() {
  const isAuthenticated = useAuth();
  const [profile, setProfile] = useState('');
  const { id, token } = isAuthenticated.authTokens;

  useEffect(() => {
    async function getProfile() {
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
    getProfile().then((result) => setProfile(result));
  }, [id, token]);

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
