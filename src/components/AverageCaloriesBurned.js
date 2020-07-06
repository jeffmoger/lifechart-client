import React from 'react';
import GadgetRing from './GadgetRing';

const AverageCaloriesBurned = props => {
    
    const { caloriesBurnedAvg, caloriesConsumedAvg } = props.data.chartData;
    const avgDifference = caloriesBurnedAvg - caloriesConsumedAvg  

    const gadgetProps = {
      score: avgDifference,
      goal: 500,
      label: 'Calorie Score'
    }

    return (
      <div>
        <GadgetRing gadgetProps={gadgetProps} />
      </div>
    ) 
  }


export default AverageCaloriesBurned