import React, { useState, useEffect } from 'react';
import GadgetRing from './GadgetRing';
import { createCalorieGadget } from './functions';
import { calorieGadgets } from './config';

const GadgetCalories = (props) => {
  const { data, color } = props;
  const [score, setScore] = useState([]);

  useEffect(() => {
    if (data) {
      let arr = [];
      calorieGadgets.map((gadget) =>
        arr.push(
          createCalorieGadget(
            data,
            gadget.days,
            gadget.includeToday,
            gadget.type
          )
        )
      );
      setScore(arr);
    }
  }, [data]);

  return (
    <>
      {score.length > 0
        ? calorieGadgets.map((gadget, index) => (
            <div key={gadget.name}>
              <GadgetRing
                score={score[index]}
                color={color}
                goal={gadget.goal}
                label={gadget.label}
              />
            </div>
          ))
        : null}
    </>
  );
};

export default GadgetCalories;
