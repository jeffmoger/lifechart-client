import React from 'react'


const AverageCaloriesBurned = props => {
    function isPositive(num){
      if (num > 0) return true
    }
    const { 
      caloriesBurnedAvg,
      //caloriesBurnedTotal, 
      caloriesConsumedAvg, 
      //caloriesConsumedTotal 
    } = props.data.chartData;
    const avgDifference = caloriesBurnedAvg - caloriesConsumedAvg
    //const totalDifference = caloriesBurnedTotal - caloriesConsumedTotal
    
    return (
      <div>
        <p className="calorieScore">{isPositive(avgDifference) ? `+${avgDifference}` : `${avgDifference}`}</p>
      </div>
    ) 
  }
  

  export default AverageCaloriesBurned