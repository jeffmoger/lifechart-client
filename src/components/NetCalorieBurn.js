import React from 'react';
import GadgetRing from './GadgetRing';

export default function NetCalorieBurn(props) {
  const { netCalorieBurn } = props.data.chartData;
  const gadgetProps = {
    score: netCalorieBurn,
    goal: 7000,
    label: '14 Day Total',
  };
  return (
    <div>
      <GadgetRing gadgetProps={gadgetProps} />
    </div>
  );
}
