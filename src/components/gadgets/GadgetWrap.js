import React, { useState, useEffect } from 'react';
import GadgetDetails from './GadgetDetails';
import { createGadget } from './functions';
import { gadgetConfig } from './config';

const GadgetWrap = (props) => {
  const { data, name } = props;
  const [score, setScore] = useState([]);
  const [gadgetList, setGadgetList] = useState([]);

  useEffect(() => {
    if (data && name) {
      setGadgetList(
        gadgetConfig(name).filter((gadget) => gadget.active === true)
      );
    }
  }, [data, name]);

  useEffect(() => {
    if (gadgetList) {
      let arr = [];
      gadgetList.map((gadget) =>
        arr.push(
          createGadget(
            data,
            gadget.days,
            gadget.includeToday,
            gadget.type,
            gadget.goal,
            name
          )
        )
      );
      setScore(arr);
    }
  }, [data, gadgetList, name]);

  return (
    <>
      {score.length > 0
        ? gadgetList.map((gadget, index) => (
            <div key={gadget.name}>
              <GadgetDetails
                scoreArr={score[index]}
                label={gadget.label}
                days={gadget.days}
                name={name}
              />
            </div>
          ))
        : null}
    </>
  );
};

export default GadgetWrap;
