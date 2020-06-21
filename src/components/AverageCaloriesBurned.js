import React from 'react'


const AverageCaloriesBurned = props => {
  
    function isPositive(num){
      if (num > 0) return true
    }
    if (localStorage.getItem("chartData")===null) {
      return false
    }
    const { 
      caloriesBurnedAvg,
      //caloriesBurnedTotal, 
      caloriesConsumedAvg, 
      //caloriesConsumedTotal 
    } = JSON.parse(localStorage.getItem("chartData"));
    const avgDifference = caloriesBurnedAvg - caloriesConsumedAvg
    //const totalDifference = caloriesBurnedTotal - caloriesConsumedTotal
    
    return (
      <div>
        <p className="calorieScore">{isPositive(avgDifference) ? `+${avgDifference}` : `${avgDifference}`}</p>
      </div>
    ) 
  }
  

  export default AverageCaloriesBurned