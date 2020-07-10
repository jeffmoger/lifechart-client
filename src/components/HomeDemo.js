import React, { useState } from 'react';

import CalorieChart from '../charts/CalorieChart';
import AverageCaloriesBurned from './AverageCaloriesBurned';
import StepCount from './StepCount';
import ActiveMinutes from './ActiveMinutes';
import NetCalorieBurn from './NetCalorieBurn';

const Intro = () => {
  return (
    <>
      <p>
        Bring all your personal life, fitness and nutrition data into one place.
      </p>
    </>
  );
};

export default function HomeDemo() {
  const [chartData] = useState(require('../data'));
  return (
    <div>
      <section className="calorieChart">
        <CalorieChart data={chartData} />
      </section>
      <section className="gadgets">
        <div className="container">
          <div>
            <AverageCaloriesBurned data={chartData} />
          </div>
          <div>
            <NetCalorieBurn data={chartData} />
          </div>
          <div>
            <StepCount data={chartData} />
          </div>
          <div>
            <ActiveMinutes data={chartData} />
          </div>
        </div>
      </section>
    </div>
  );
}
