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

export default class MoodChart extends PureComponent {
  render() {
    const moodChart = this.props.data;
    const colors = chartColors(this.props.palette);
    const { moodChart: theme, styles, wrapperStyle } = colors;
    return (
      <ResponsiveContainer>
        <LineChart data={moodChart} syncId="anyId">
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
            domain={[0, 10]}
          />
          <Tooltip
            contentStyle={wrapperStyle}
            cursor={theme.toolTip.cursor}
            labelFormatter={formatToolTipLabel}
          />
          <Legend verticalAlign="top" iconType="circle" height={30} />
          <Line
            connectNulls
            type="monotone"
            dataKey="Energy"
            stroke={theme.energy}
            dot={false}
          />
          <Line
            connectNulls
            type="monotone"
            dataKey="Pleasantness"
            stroke={theme.mood}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
