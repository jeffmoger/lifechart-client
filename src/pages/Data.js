import React from 'react'
import Nav from '../components/Nav';

export default function Data(props) {
    console.log('Rendering Data')
    console.log(props)
    return (
        <main>
      <Nav />
      <h3>Data</h3>
    </main>
    )
}
