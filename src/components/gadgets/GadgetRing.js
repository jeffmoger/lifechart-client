import React, { useState, useEffect } from 'react';
import { useCountUp } from 'react-countup';

const getPercent = (score, goal) => {
  return (score / goal) * 100;
};

const scoreColor = (score) => {
  switch (true) {
    case score >= 100:
      return '#645cff';
    case score >= 80:
      return '#6f68f3';
    case score >= 60:
      return '#7e78e2';
    case score >= 40:
      return '#908dce';
    case score >= 20:
      return '#9b99c2';
    case score >= 0:
      return '#adadad';
    default:
      return '#666666';
  }
};

export default function GadgetRing(props) {
  const [gadgetScore, setGadgetScore] = useState(0);
  const { score, goal, label, color } = props.gadgetProps;
  const { countUp, update: hookUpdate } = useCountUp({
    end: score,
    duration: 1,
    delay: 0,
  });

  useEffect(() => {
    setGadgetScore(score);
  }, [score]);

  useEffect(() => {
    hookUpdate(gadgetScore);
  }, [hookUpdate, gadgetScore]);

  const size = 90;
  const stroke = scoreColor(getPercent(score, goal));
  const labelSize = 8;
  const fontSize = 24;
  const strokeWidth = 6;
  const r = (size - strokeWidth * 2) / 2;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
      <defs />
      <path fill="none" d="M0 252h417v99.333H0z" />
      <text
        x="50%"
        y="55%"
        textAnchor="middle"
        fill={color}
        fontFamily="Roboto"
        fontSize={fontSize}
      >
        {countUp}
      </text>
      <text
        x="50%"
        y="67%"
        textAnchor="middle"
        fill="#999999"
        fontFamily="Roboto"
        fontSize={labelSize}
      >
        {label}
      </text>
      <g>
        <circle
          fill="none"
          stroke={stroke}
          strokeWidth={strokeWidth}
          cx="50%"
          cy="50%"
          r={r}
        />
      </g>
    </svg>
  );
}
