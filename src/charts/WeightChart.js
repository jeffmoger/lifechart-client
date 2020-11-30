import React, { PureComponent } from 'react';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
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
    const { weightChart: theme, styles, type, wrapperStyle } = colors;
    return (
      <div className={`${type && type + '-'}chartContainer`}>
        <Typography variant="h6" component="h2" align="center">
          Weight
        </Typography>
        <ResponsiveContainer>
          <LineChart
            width={730}
            data={weightChart}
            syncId="anyId"
            margin={{ top: 0, right: 5, left: 5, bottom: 20 }}
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
      </div>
    );
  }
}
