import React from 'react';
import GadgetRing from './GadgetRing';

const AverageCaloriesBurned = (props) => {
  const { calorieScore, color } = props;
  const gadgetProps = {
    score: calorieScore,
    goal: 500,
    label: 'Daily Average',
    color,
  };

  return (
    <div>
      <GadgetRing gadgetProps={gadgetProps} />
    </div>
  );
};

export default AverageCaloriesBurned;
