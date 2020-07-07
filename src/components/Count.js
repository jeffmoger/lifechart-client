import React from 'react';
import CountUp from 'react-countup';

export default function Count() {
  return (
    <div>
      <CountUp end={100} delay={1} />
    </div>
  );
}
