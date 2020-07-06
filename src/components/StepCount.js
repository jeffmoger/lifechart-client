import React from 'react';
import GadgetRing from './GadgetRing';

export default function StepCount(props) {
  const { stepCount } = props.data.chartData;
   
  const gadgetProps = {
    score: stepCount,
    goal: 10000,
    label: 'Step Count'
  }
  return (
    <div>
        <GadgetRing gadgetProps={gadgetProps} />
    </div>
  )
}
