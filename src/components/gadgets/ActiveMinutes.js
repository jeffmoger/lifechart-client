import React from 'react';
import GadgetRing from './GadgetRing';

export default function ActiveMinutes(props) {
  const { activeMinutes, color } = props;
  const gadgetProps = {
    score: activeMinutes,
    goal: 240,
    label: 'Active Minutes',
    color,
  };

  return (
    <div>
      <GadgetRing gadgetProps={gadgetProps} />
    </div>
  );
}
