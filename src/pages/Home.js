import React, {useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import { useAuth } from "../context/auth";


function Home(props) {
  const isAuthenticated = useAuth();
  const notAuthMessage = (
    <>
      <p>You must <Link to="/login">login</Link> to use this site.</p>
    </>
  )
  return (
    <div id="main-container" className="eleven columns" style={{marginTop: '5%'}}>
      <h3>Home</h3>
      {isAuthenticated.authTokens? <HomeCharts /> : notAuthMessage }
      <div id="data"></div>
    </div>
    )
}

const HomeCharts = (props) => {
  const { id, token } = JSON.parse(localStorage.getItem("tokens"));
  const [staleData, setStaleData] = useState(false);
  const [lastFetch, setLastFetch] = useState('');

  useEffect(() => {
    setStaleData(checkLastFetched(1))
  }, [lastFetch])

  useEffect(() => {
    if (staleData) {
      getData(id, token)
      .then(response => {
        const timestamp = new Date().getTime()
        localStorage.setItem("data", JSON.stringify(
          {...response, fetched: timestamp}
          ))
        localStorage.setItem("chartData", JSON.stringify(loadChartData()))
        setStaleData(false)
        setLastFetch(timestamp)
      })
    }
  }, [id, token, staleData])

  return (
    <div>
      <AverageCaloriesBurned />
    </div>
  )
}


const AverageCaloriesBurned = props => {
  
  function isPositive(num){
    if (num > 0) return true
  }
  
  const { 
    caloriesBurnedAvg,
    caloriesBurnedTotal, 
    caloriesConsumedAvg, 
    caloriesConsumedTotal } = JSON.parse(localStorage.getItem("chartData"));
  const avgDifference = caloriesBurnedAvg - caloriesConsumedAvg
  const totalDifference = caloriesBurnedTotal - caloriesConsumedTotal
  
  return (
    <div>
      <p>Calorie Score: {isPositive(avgDifference) ? `+${avgDifference} (+${totalDifference})` : `${avgDifference} | ${totalDifference}`}</p>
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

function loadChartData(){
  if (localStorage.getItem("data")===null) {
    return false
  }
  const data = JSON.parse(localStorage.getItem("data"))
  const caloriesBurned = data["exercise"].arrays.CaloriesBurned
  //const activeMinutes = data["exercise"].arrays.ActiveMinutes
  //const stepCount = data["exercise"].arrays.StepCount
  const nutrition = data["nutrition"].arrays.Nutrition
  const nutritionCalories = nutrition.filter(item => item.key==='calories')
  const caloriesBurnedTotal = caloriesBurned.map(amount).reduce(sum);
  const nutritionCaloriesTotal = nutritionCalories.map(amount).reduce(sum);
  const chartValues = {
    caloriesBurnedAvg: avg(caloriesBurnedTotal,caloriesBurned),
    caloriesBurnedTotal: caloriesBurnedTotal,
    caloriesConsumedAvg: avg(nutritionCaloriesTotal,nutritionCalories),
    caloriesConsumedTotal: nutritionCaloriesTotal
  }
  return chartValues
}


function checkLastFetched(wait) {
  if (localStorage.getItem("data")===null) return true
  const { fetched } = JSON.parse(localStorage.getItem("data"))
  const t = new Date().getTime();
  const w = wait * 60000
  return ((fetched + w) > t) ? false : true
}


function amount(item){
  return item.value
}
function sum(prev, next){
  return prev + next;
}
function avg(total,array) {
  return Math.round(total/array.length)
}


export default Home;