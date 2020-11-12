import React from 'react';
import GadgetRing from './GadgetRing';

export default function StepCount(props) {
  const { stepCount, color } = props;

  const gadgetProps = {
    score: stepCount,
    goal: 10000,
    label: 'Step Count',
    color,
  };
  return (
    <div>
      <GadgetRing gadgetProps={gadgetProps} />
    </div>
  );
}
