import React, { useState } from 'react';

import CalorieChart from '../charts/CalorieChart';
import NutritionChart from '../charts/NutritionChart';
import AverageCaloriesBurned from './AverageCaloriesBurned';
import StepCount from './StepCount';
import ActiveMinutes from './ActiveMinutes';
import NetCalorieBurn from './NetCalorieBurn';

export default function HomeDemo() {
  const [chartData] = useState(require('../data'));
  return (
    <div>
      <section className="calorieChart">
        <CalorieChart data={chartData} />
        <NutritionChart data={chartData} />
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
