import React, { useState, useEffect } from 'react';
import GadgetRing from './GadgetRing';
import { createCalorieGadget } from './functions';

const GadgetCalories = (props) => {
  const { data, label, goal, color, days, includeToday, type } = props;
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (data) {
      setScore(createCalorieGadget(data, days, includeToday, type));
    }
  }, [data, days, includeToday, type]);

  useEffect(() => {
    //console.log(data);
  }, [data]);

  return (
    <div>
      <GadgetRing score={score} color={color} goal={goal} label={label} />
    </div>
  );
};

export default GadgetCalories;
