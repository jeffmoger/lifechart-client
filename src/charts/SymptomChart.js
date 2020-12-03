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
import { chartColors } from '../functions/chartColors';

const formatXAxis = (tickItem) => {
  return moment(tickItem).format('ddd D');
};
const formatToolTipLabel = (label) => {
  return moment(label).format('MMMM D, YYYY');
};

export default class SymptomChart extends PureComponent {
  render() {
    const { data, symptoms } = this.props;
    const colors = chartColors(this.props.palette);
    const { colorArray, symptomChart: theme, styles, wrapperStyle } = colors;
    return (
      <ResponsiveContainer>
        <LineChart data={data} syncId="anyId">
          <CartesianGrid strokeDasharray="1 3" stroke={styles.cartesianGrid} />
          <XAxis
            dataKey="date"
            stroke={styles.axisX}
            axisLine={false}
            tickLine={false}
            mirror={false}
            tickFormatter={formatXAxis}
          />
          <YAxis
            stroke={styles.axisY}
            axisLine={false}
            tickLine={false}
            orientation="left"
            width={35}
            mirror={true}
            interval="preserveEnd"
            domain={[0, 5]}
          />
          <Tooltip
            contentStyle={wrapperStyle}
            cursor={theme.toolTip.cursor}
            labelFormatter={formatToolTipLabel}
          />
          <Legend verticalAlign="top" iconType="circle" height={30} />
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
    );
  }
}
