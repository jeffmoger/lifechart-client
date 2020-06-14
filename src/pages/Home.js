import React, {useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import { useAuth } from "../context/auth";


const HomeCharts = (props) => {
  const { id, token } = JSON.parse(localStorage.getItem("tokens"));
  const [staleData, setStaleData] = useState(false)
  const [lastFetch, setLastFetch] = useState('')
  

  function checkLastFetched(wait) {
    if (localStorage.getItem("data")===null) return true
    const { fetched } = JSON.parse(localStorage.getItem("data"))
    const t = new Date().getTime();
    const w = wait * 60000
    return ((fetched + w) > t) ? false : true
  }

  useEffect(() => {
    setStaleData(checkLastFetched(60))
  }, [lastFetch])

  useEffect(() => {
    if (staleData) {
      getData(id, token)
      .then(response => {
        const timestamp = new Date().getTime()
        localStorage.setItem("data", JSON.stringify(
          {...response, fetched: timestamp}
          ))
        setStaleData(false)
        setLastFetch(timestamp)
      })
    }
  }, [id, token, staleData])


  const AverageCaloriesBurned = (arr) => {
    return (
      <div>320</div>
    ) 
  }

  return (
    <div>
      <p>This message is for you if you have already logged in. Visit 
      <Link to="/settings">settings</Link>.</p>
      <AverageCaloriesBurned />
    </div>
  )
}


function Home(props) {
  const isAuthenticated = useAuth();

  const notAuthMessage = (
    <>
      <p>This message is for you if you have not logged in. <Link to="/login">Login</Link></p>
    </>
  )
  return (
    <div id="main-container" className="eleven columns" style={{marginTop: '5%'}}>
      <h3>Home</h3>
      {isAuthenticated.authTokens? <HomeCharts /> : notAuthMessage }
    </div>
    )
}


async function getData(id, token) {
  try {
    const r = await fetch('https://localhost/api/get_range_data', {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'authorization': 'Token ' + token,
          'id': id
        },
      });
    const response = await r.json();
    return response;
  }
  catch (err) {
    return console.log(err);
  }
}




export default Home;