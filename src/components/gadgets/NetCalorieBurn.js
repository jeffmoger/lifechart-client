import React, { useState, useEffect } from 'react';
import GadgetRing from './GadgetRing';

export default function NetCalorieBurn(props) {
  const { netCalorieBurn, color } = props;
  const label = '14 Day Total';
  const goal = 7000;
  const [score, setScore] = useState(0);

  useEffect(() => {
    setScore(netCalorieBurn);
  }, [netCalorieBurn]);

  return (
    <div>
      <GadgetRing score={score} color={color} goal={goal} label={label} />
    </div>
  );
}
