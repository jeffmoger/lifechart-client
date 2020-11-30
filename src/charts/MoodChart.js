import React, { PureComponent } from 'react';
import Typography from '@material-ui/core/Typography';
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
    const { moodChart: theme, styles, type, wrapperStyle } = colors;
    return (
      <div className={`${type && type + '-'}chartContainer`}>
        <Typography variant="h6" component="h2" align="center">
          Mood & Wellbeing
        </Typography>
        <ResponsiveContainer>
          <LineChart
            width={730}
            data={moodChart}
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
              dot={{ fill: theme.energy }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
