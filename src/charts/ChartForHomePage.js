import React, { PureComponent } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
} from 'recharts';

const generateChart = (min, max) => {
  const arr = [];
  const chartLength = 6;
  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  var i;
  for (i = 0; i < chartLength; i++) {
    arr.push({ a: 0 });
    arr.push({ a: getRandomIntInclusive(min, max) });
  }
  arr.push({ a: 0 });
  return arr;
};

const data = generateChart();

export default class ChartForHomePage extends PureComponent {
  render() {
    return (
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="a" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#232323" stopOpacity={1} />
              <stop offset="100%" stopColor="#232323" stopOpacity={1} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="a"
            stroke="#8884d8"
            dot={false}
            fillOpacity={1}
            fill="url(#a)"
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}
