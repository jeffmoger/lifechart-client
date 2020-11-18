import React, { useState, useEffect } from 'react';
import HomeCharts from '../components/HomeCharts';
import { getDemoID, fetchAuthentication } from '../functions/apiCalls';
import Loader from '../components/Loader';

export default function Demo() {
  const [authTokens, setAuthTokens] = useState('');

  useEffect(() => {
    getDemoID().then((user) => {
      fetchAuthentication(user.email, user.password).then((result) => {
        setAuthTokens(result.user);
      });
    });
  }, []);

  return (
    <main>
      {authTokens ? (
        <HomeCharts authTokens={authTokens} demo="demo" />
      ) : (
        <div>
          <Loader />
        </div>
      )}
    </main>
  );
}
