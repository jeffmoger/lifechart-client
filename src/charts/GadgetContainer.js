import React from 'react';
import ActiveMinutes from '../components/gadgets/ActiveMinutes';
import AverageCaloriesBurned from '../components/gadgets/AverageCaloriesBurned';
import NetCalorieBurn from '../components/gadgets/NetCalorieBurn';
import StepCount from '../components/gadgets/StepCount';

export default function gadgetContainer(props) {
  const { data, theme } = props;

  const gadgetColor = (theme) => {
    if (theme === 'dark') {
      return '#EEEEEE';
    } else {
      return '#444444';
    }
  };

  return (
    <div>
      {data && (
        <section className="gadgets">
          <div className="container">
            <div>
              <AverageCaloriesBurned
                calorieScore={data.calorieScore}
                color={gadgetColor(theme)}
              />
            </div>
            <div>
              <NetCalorieBurn
                netCalorieBurn={data.netCalorieBurn}
                color={gadgetColor(theme)}
              />
            </div>
            <div>
              <StepCount
                stepCount={data.stepCount}
                color={gadgetColor(theme)}
              />
            </div>
            <div>
              <ActiveMinutes
                activeMinutes={data.activeMinutes}
                color={gadgetColor(theme)}
              />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
