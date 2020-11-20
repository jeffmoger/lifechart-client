import React from 'react';
import Container from '@material-ui/core/Container';
import PrivacyText from '../components/PrivacyText';

export default function Privacy() {
  return (
    <main className="privacy">
      <Container maxWidth="md">
        <PrivacyText />
      </Container>
    </main>
  );
}
