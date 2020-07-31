import React, { PureComponent } from 'react';
import moment from 'moment';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
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

export default class NutritionChart extends PureComponent {
  render() {
    const nutritionChart = this.props.data;
    return (
      <div
        className="chartContainer"
        style={{ maxWidth: 960, height: 300, color: '#CCC' }}
      >
        <ResponsiveContainer>
          <BarChart
            width={730}
            height={300}
            data={nutritionChart}
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
              domain={[0, 2800]}
            />
            <Tooltip
              contentStyle={wrapperStyle}
              cursor={{ fill: '#232323', stroke: '#222', strokeWidth: 0 }}
              labelFormatter={formatToolTipLabel}
            />
            <Legend verticalAlign="top" iconType="circle" height={36} />
            <Bar
              dataKey="Protein"
              stackId="a"
              fill="#367d51"
              fillOpacity={0.6}
              barSize={15}
            />
            <Bar dataKey="Fat" stackId="a" fill="#4db374" fillOpacity={0.6} />
            <Bar dataKey="Carbs" stackId="a" fill="#82ca9d" fillOpacity={0.6} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
