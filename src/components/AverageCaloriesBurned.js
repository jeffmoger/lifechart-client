import React from 'react';
import GadgetRing from './GadgetRing';

const AverageCaloriesBurned = (props) => {
  const { calorieScore } = props.data.chartData;

  const gadgetProps = {
    score: calorieScore,
    goal: 500,
    label: 'Calorie Score',
  };

  return (
    <div>
      <GadgetRing gadgetProps={gadgetProps} />
    </div>
  );
};

export default AverageCaloriesBurned;
