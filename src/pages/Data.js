import React from 'react'
import Nav from '../components/Nav';

export default function Data(props) {
    console.log('Rendering Data')
    console.log(props)
    return (
        <div id="main-container" className="eleven columns" style={{marginTop: '5%'}}>
      <Nav />
      <h3>Data</h3>
    </div>
    )
}
