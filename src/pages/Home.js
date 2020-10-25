import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../context/auth';
import HomeCharts from '../components/HomeCharts';

export default function Home() {
  const { authTokens } = useAuth();
  return (
    <main>
      {authTokens ? (
        <HomeCharts authTokens={authTokens} />
      ) : (
        <Redirect to={'/demo'} />
      )}
    </main>
  );
}
