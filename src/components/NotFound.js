import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div>
      <h3>404 - Not Found!</h3>
      <Link to="/">Go Home</Link>
    </div>
  );
}
