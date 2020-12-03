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
} from 'recharts';
import { chartColors } from '../functions/chartColors';

const formatXAxis = (tickItem) => {
  return moment(tickItem).format('ddd D');
};
const formatToolTipLabel = (label) => {
  return moment(label).format('MMMM D, YYYY');
};

export default class WeightChart extends PureComponent {
  render() {
    const weightChart = this.props.data;
    const colors = chartColors(this.props.palette);
    const { weightChart: theme, styles, wrapperStyle } = colors;
    return (
      <ResponsiveContainer>
        <LineChart data={weightChart} syncId="anyId" margin={{ top: 30 }}>
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
            interval="preserveStart"
            domain={[
              (dataMin) => Math.round(dataMin) - 6,
              (dataMax) => Math.round(dataMax) + 6,
            ]}
          />
          <Tooltip
            contentStyle={wrapperStyle}
            cursor={theme.toolTip.cursor}
            labelFormatter={formatToolTipLabel}
          />
          <Line
            connectNulls
            type="monotone"
            dataKey="Weight"
            stroke={theme.weight}
            dot={{ fill: theme.weight }}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
