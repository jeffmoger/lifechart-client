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

const colorArray = ['#b6b67c', '#7cb67c', '#7cb6b6', '#8b7cb6', '#b67c8b'];
const formatXAxis = (tickItem) => {
  return moment(tickItem).format('ddd D');
};
const formatToolTipLabel = (label) => {
  return moment(label).format('MMMM D, YYYY');
};

export default class SymptomChart extends PureComponent {
  render() {
    const { data, symptoms } = this.props;
    return (
      <div
        className="chartContainer"
        style={{ maxWidth: 960, height: 300, color: '#CCC' }}
      >
        <ResponsiveContainer>
          <LineChart
            width={730}
            height={300}
            data={data}
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
              cursor={{ stroke: '#222', strokeWidth: 1 }}
              labelFormatter={formatToolTipLabel}
            />
            <Legend verticalAlign="top" iconType="circle" height={36} />
            {symptoms.map((symptom, index) => (
              <Line
                key={symptom.symptom}
                type="monotone"
                dataKey={symptom.symptom}
                stroke={colorArray[index]}
                dot={{ fill: colorArray[index] }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
