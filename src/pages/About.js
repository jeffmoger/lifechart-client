import React from 'react';
import Nav from '../components/Nav';

export default function About(props) {
  console.log('Rendering About')
  return (
    <div id="main-container" className="eleven columns" style={{marginTop: '5%'}}>
      <Nav />
      <h3>About</h3>
    </div>
  )
}
