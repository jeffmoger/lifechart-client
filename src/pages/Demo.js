import React, { useState, useEffect } from 'react';
import HomeCharts from '../components/HomeCharts';
import {
  getDemoID,
  fetchAuthentication,
  getProfile,
} from '../functions/apiCalls';

export default function Demo() {
  const [profile, setProfile] = useState('');
  const [authTokens, setAuthTokens] = useState('');

  useEffect(() => {
    getDemoID().then((user) => {
      fetchAuthentication(user.email, user.password).then((result) => {
        setAuthTokens(result.user);
        getProfile(result.user.id, result.user.token).then((result) => {
          setProfile(result);
        });
      });
    });
  }, []);

  return (
    <main>
      {authTokens ? (
        <HomeCharts authTokens={authTokens} profile={profile} />
      ) : (
        <div></div>
      )}
    </main>
  );
}
