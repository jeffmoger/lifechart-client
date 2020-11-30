import React, { useState, useEffect } from 'react';
import GadgetRing from './GadgetRing';

const AverageCaloriesBurned = (props) => {
  const { calorieScore, color } = props;
  const label = '3 Day Average';
  const goal = 500;

  const [score, setScore] = useState(0);

  useEffect(() => {
    setScore(calorieScore);
  }, [calorieScore]);

  return (
    <div>
      <GadgetRing score={score} color={color} goal={goal} label={label} />
    </div>
  );
};

export default AverageCaloriesBurned;
