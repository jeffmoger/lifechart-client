import React from 'react';


const isPositive = num => {
  if (num > 0) return true
}

const getPercent = (score, goal) => {
  return score/goal*100
}

const scoreColor = score => {
  switch (true) {
      case score >= 100:
        return '#645cff'
      case score >= 80:
        return '#6f68f3'
      case score >= 60:
        return '#7e78e2'
      case score >= 40:
        return '#908dce'
      case score >= 20:
        return '#9b99c2'
      case score >= 0:
        return '#adadad'
      default:
        return '#666666'
  }
}




export default function GadgetRing(props) {
  
  const { score, goal, label } = props.gadgetProps;
  const size = 140;
  const stroke = scoreColor(getPercent(score, goal));
  const labelSize = 12;
  const fontSize = 30;
  const strokeWidth = 6;
  const r = (size-(strokeWidth*2))/2;


  
  return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
        <defs/>
        <path fill="none" d="M0 252h417v99.333H0z"/>
        <text x="50%" y="55%" textAnchor="middle" fill="#FFFFFF" fontFamily="'Quicksand'" fontSize={fontSize}>
        {score}
        </text>
        <text x="50%" y="67%" textAnchor="middle" fill="#999999" fontFamily="'Quicksand'" fontSize={labelSize}>
        {label}
        </text>
        <g>
          <circle fill="none" stroke={stroke} strokeWidth={strokeWidth} cx="50%" cy="50%" r={r} />
        </g>
      </svg>
  )
}
