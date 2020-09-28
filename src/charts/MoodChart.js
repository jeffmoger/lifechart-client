import React, { PureComponent } from 'react';
import moment from 'moment';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const wrapperStyle = {
  backgroundColor: '#000000',
  opacity: 0.8,
  border: '1px solid #8884d8',
  textShadow: '1px 1px black',
};

const formatXAxis = (tickItem) => {
  return moment(tickItem).format('ddd D');
};
const formatToolTipLabel = (label) => {
  return moment(label).format('MMMM D, YYYY');
};

export default class MoodChart extends PureComponent {
  render() {
    const moodChart = this.props.data;
    return (
      <div
        className="chartContainer"
        style={{ maxWidth: 960, height: 300, color: '#CCC' }}
      >
        <ResponsiveContainer>
          <LineChart
            width={730}
            height={300}
            data={moodChart}
            syncId="anyId"
            margin={{ top: 20, right: 5, left: 5, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="1 3" stroke="#202020" />
            <XAxis
              dataKey="date"
              stroke="#CCC"
              axisLine={false}
              tickLine={false}
              mirror={false}
              tickFormatter={formatXAxis}
            />
            <YAxis
              stroke="#CCC"
              axisLine={false}
              tickLine={false}
              orientation="left"
              width={35}
              mirror={false}
              interval="preserveEnd"
              domain={[0, 5]}
            />
            <Tooltip
              contentStyle={wrapperStyle}
              cursor={{ fill: '#232323', stroke: '#222', strokeWidth: 0 }}
              labelFormatter={formatToolTipLabel}
            />
            <Legend verticalAlign="top" iconType="circle" height={36} />
            <Line
              connectNulls
              type="monotone"
              dataKey="Energy"
              stroke="#367d51"
              dot={false}
            />
            <Line
              connectNulls
              type="monotone"
              dataKey="Irritability"
              stroke="#990000"
              dot={false}
            />
            <Line
              connectNulls
              type="monotone"
              dataKey="Mood"
              stroke="#8884d8"
              dot={{ fill: '#8884d8', strokeWidth: 1 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
