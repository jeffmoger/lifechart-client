import React, { PureComponent } from 'react';
import moment from 'moment';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
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

export default class NutritionChart extends PureComponent {
  render() {
    const nutritionChart = this.props.data;
    const colors = chartColors(this.props.palette);
    const { nutritionChart: theme, styles, wrapperStyle } = colors;
    return (
      <ResponsiveContainer>
        <ComposedChart data={nutritionChart} syncId="anyId">
          <CartesianGrid strokeDasharray="1 3" stroke={styles.cartesianGrid} />
          <XAxis
            dataKey="date"
            stroke={styles.axisX}
            axisLine={false}
            tickLine={false}
            mirror={false}
            tickFormatter={formatXAxis}
          />
          <Tooltip
            contentStyle={wrapperStyle}
            cursor={theme.toolTip.cursor}
            labelFormatter={formatToolTipLabel}
          />
          <Legend verticalAlign="top" iconType="circle" height={30} />
          <YAxis
            stroke={styles.axisY}
            axisLine={false}
            tickLine={false}
            orientation="left"
            width={35}
            mirror={true}
            //interval={0}
            domain={[0, (dataMax) => Math.round(dataMax / 100) * 100 + 200]}
          />
          <YAxis
            yAxisId="right"
            stroke={styles.axisY}
            axisLine={false}
            tickLine={false}
            orientation="right"
            width={35}
            mirror={true}
          />
          <Bar
            dataKey="Protein"
            stackId="a"
            fill={theme.protein}
            fillOpacity={0.6}
            barSize={15}
          />
          <Bar dataKey="Fat" stackId="a" fill={theme.fat} fillOpacity={0.6} />
          <Bar
            dataKey="Carbs"
            stackId="a"
            fill={theme.carbs}
            fillOpacity={0.6}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="Sugar"
            stroke="#f5c73d"
            dot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    );
  }
}
