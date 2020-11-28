import React, { PureComponent } from 'react';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
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

export default class CalorieChart extends PureComponent {
  render() {
    const calorieChart = this.props.data;
    const colors = chartColors(this.props.palette);
    const { calorieChart: theme, styles, type, wrapperStyle } = colors;
    return (
      <div className={`${type && type + '-'}chartContainer`}>
        <Typography variant="h6" component="h2" align="center">
          Calories Burned vs Consumed
        </Typography>
        <ResponsiveContainer>
          <AreaChart
            width={730}
            height={350}
            data={calorieChart}
            syncId="anyId"
            margin={{ top: 20, right: 5, left: 5, bottom: 20 }}
          >
            <defs>
              <linearGradient id="colorBurned" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={theme.burned} stopOpacity={0.8} />
                <stop offset="95%" stopColor={theme.burned} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorConsumed" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={theme.consumed}
                  stopOpacity={0.8}
                />
                <stop offset="95%" stopColor={theme.consumed} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              stroke={styles.axisX}
              axisLine={false}
              tickLine={false}
              mirror={false}
              tickFormatter={formatXAxis}
            />
            <CartesianGrid
              strokeDasharray="1 3"
              stroke={styles.cartesianGrid}
            />
            <Tooltip
              contentStyle={wrapperStyle}
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
              //interval="preserveEnd"
              domain={[0, (dataMax) => Math.round(dataMax / 100) * 100 + 200]}
            />
            <Area
              type="monotone"
              dataKey="Burned"
              stroke={theme.burned}
              fillOpacity={1}
              fill="url(#colorBurned)"
            />
            <Area
              type="monotone"
              dataKey="Consumed"
              stroke={theme.consumed}
              fillOpacity={1}
              fill="url(#colorConsumed)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
