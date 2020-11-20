import React from 'react';
import Container from '@material-ui/core/Container';
import TermsText from '../components/TermsText';

export default function Terms() {
  return (
    <main className="terms">
      <Container maxWidth="md">
        <TermsText />
      </Container>
    </main>
  );
}
