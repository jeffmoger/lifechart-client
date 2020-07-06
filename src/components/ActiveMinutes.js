import React from 'react';
import GadgetRing from './GadgetRing';

export default function ActiveMinutes(props) {
  const { activeMinutes } = props.data.chartData;
  const gadgetProps = {
    score: activeMinutes,
    goal: 240,
    label: 'Active Minutes'
  }

  return (
    <div>
      <GadgetRing gadgetProps={gadgetProps} />
    </div>
  )
}
