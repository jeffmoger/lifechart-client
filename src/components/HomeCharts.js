import React, {useState, useEffect } from "react";

import CalorieChart from '../charts/CalorieChart'
import moveDataFromGoogle from '../functions/moveDataFromGoogle'
import getData from '../functions/getData'
import loadChartData from '../functions/loadChartData'
import AverageCaloriesBurned from '../components/AverageCaloriesBurned'



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
  
    const StepCount = (props) => {
      const { stepCount } = props.data.chartData
      return (
        <div>
          <h4>Step Count</h4>
          <p>{stepCount}</p>
        </div>
      )
    }

    const ActiveMinutes = (props) => {
      const { activeMinutes } = props.data.chartData
      return (
        <div>
          <h4>Active Minutes</h4>
          <p>{activeMinutes}</p>
        </div>
      )
    }


    return (
      <div className='calories card'>
        {chartData ? 
          <>
            <AverageCaloriesBurned data = {chartData}/>
            <CalorieChart data={chartData} />
            <StepCount data={chartData} />
            <ActiveMinutes data={chartData} />
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