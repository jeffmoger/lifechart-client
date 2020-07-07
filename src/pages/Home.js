import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/auth';
import HomeCharts from '../components/HomeCharts';

export default function Home(props) {
  const isAuthenticated = useAuth();
  const notAuthMessage = (
    <>
      <h3>Home</h3>
      <p>
        You must <Link to="/login">login</Link> to use this site.
      </p>
    </>
  );
  return (
    <main>
      {isAuthenticated.authTokens ? <HomeCharts /> : notAuthMessage}
      <div id="data"></div>
    </main>
  );
}
