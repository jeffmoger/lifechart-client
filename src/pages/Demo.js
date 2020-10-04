import React, { useState, useEffect } from 'react';
import HomeDemo from '../components/HomeDemo';
import { fetchAuthentication, getProfile } from '../functions/apiCalls';

const user = {};
export default function Demo() {
  const [profile, setProfile] = useState('');
  const [authTokens, setAuthTokens] = useState('');

  useEffect(() => {
    fetchAuthentication(user.jeff.email, user.jeff.password).then((result) => {
      if (result.user) {
        const { user } = result;
        setAuthTokens({
          id: user.id,
          token: user.token,
        });
      }
    });
  }, []);
  useEffect(() => {
    fetchAuthentication(user.demo.email, user.demo.password).then((result) => {
      getProfile(result.user.id, result.user.token).then((result) =>
        setProfile(result)
      );
    });
  }, []);
  return (
    <main>
      <HomeDemo authTokens={authTokens} profile={profile} />
    </main>
  );
}
