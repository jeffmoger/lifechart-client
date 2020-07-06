import React, {useState, useEffect } from "react";

import CalorieChart from '../charts/CalorieChart';
import moveDataFromGoogle from '../functions/moveDataFromGoogle';
import getData from '../functions/getData';
import loadChartData from '../functions/loadChartData';
import AverageCaloriesBurned from '../components/AverageCaloriesBurned';
import StepCount from '../components/StepCount';
import ActiveMinutes from '../components/ActiveMinutes';



const HomeCharts = (props) => {
    const { id, token } = JSON.parse(localStorage.getItem("tokens"));
    const [staleData, setStaleData] = useState(false);
    const [lastFetch, setLastFetch] = useState('');
    const [chartData, setChartData] = useState('');
  
    useEffect(() => {
      if (localStorage.getItem("sync")!==null) {
        setChartData(JSON.parse(localStorage.getItem("sync")))
      }
    },[])

    useEffect(() => {
      setStaleData(checkLastFetched(1))
    }, [lastFetch])

    useEffect(() => {
      if (staleData) {
        moveDataFromGoogle(id, token)
        .then(response => {
          var dataObject = {};
          dataObject.syncReport = response
          return dataObject
        })
        .then(async dataObject => {
          dataObject.data = await getData(id, token)
          return dataObject
        })
        .then(dataObject => {
          dataObject.chartData = loadChartData(dataObject);
          const timestamp = new Date().getTime()
          dataObject.fetched = timestamp
          localStorage.setItem("sync", JSON.stringify(dataObject));
          setStaleData(false)
          setLastFetch(timestamp)
          setChartData(dataObject)
        })
        .catch(err => console.log(err))
      }
    },[id, token, staleData])
  
    
    return (
      <div className='calories card'>
        {chartData ? 
          <>
            <CalorieChart data={chartData} />
            <br />
            <section class="gadgets">
              <div class="container">
                <div>
                  <AverageCaloriesBurned data = {chartData}/>
                </div>
                <div>
                  <StepCount data={chartData} />
                </div>
                <div>
                  <ActiveMinutes data={chartData} />
                </div>
              </div>
            </section>
          </>: null}
      </div>
    )
  }
  
  function checkLastFetched(wait) {
    if (localStorage.getItem("sync")===null) return true
    const { fetched } = JSON.parse(localStorage.getItem("sync"))
    const t = new Date().getTime();
    const w = wait * 60000
    return ((fetched + w) > t) ? false : true
  }
  

  export default HomeCharts