import React from 'react';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

export default function NotFound() {
  return (
    <main>
      <Container>
        <Typography variant="h6" component="h2" gutterBottom>
          404 Not Found
        </Typography>
        <Link to="/">Go Home</Link>
      </Container>
    </main>
  );
}
