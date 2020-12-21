import React from 'react';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export default function NotFound() {
  return (
    <main>
      <Container maxWidth="md" style={{ marginTop: 40 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          404 Not Found
        </Typography>
        <Typography variant="body1" gutterBottom>
          <Button component={Link} to="/">
            Go Home
          </Button>
        </Typography>
      </Container>
    </main>
  );
}
