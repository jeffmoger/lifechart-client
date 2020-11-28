import React, { PureComponent } from 'react';
import Typography from '@material-ui/core/Typography';
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
    const { nutritionChart: theme, styles, type, wrapperStyle } = colors;
    return (
      <div className={`${type && type + '-'}chartContainer`}>
        <Typography variant="h6" component="h2" align="center">
          Caloric Breakdown
        </Typography>
        <ResponsiveContainer>
          <BarChart
            width={730}
            height={300}
            data={nutritionChart}
            syncId="anyId"
            margin={{ top: 20, right: 5, left: 5, bottom: 20 }}
          >
            <CartesianGrid
              strokeDasharray="1 3"
              stroke={styles.cartesianGrid}
            />
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
            <Legend verticalAlign="bottom" iconType="circle" height={36} />
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
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
