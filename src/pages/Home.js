import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../context/auth';
import HomeCharts from '../components/HomeCharts';

export default function Home(props) {
  const isAuthenticated = useAuth();
  return (
    <main>
      {isAuthenticated.authTokens ? (
        <HomeCharts />
      ) : (
        <Redirect to={'/settings'} />
      )}
    </main>
  );
}
