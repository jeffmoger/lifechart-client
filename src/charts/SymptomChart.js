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

export default class SymptomChart extends PureComponent {
  render() {
    const { data, symptoms } = this.props;
    const colors = chartColors(this.props.palette);
    const {
      colorArray,
      symptomChart: theme,
      styles,
      type,
      wrapperStyle,
    } = colors;
    return (
      <div className={`${type && type + '-'}chartContainer`}>
        <Typography variant="h6" component="h2" align="center">
          Symptom Tracking
        </Typography>
        <ResponsiveContainer>
          <LineChart
            width={730}
            height={300}
            data={data}
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
            <Legend verticalAlign="bottom" iconType="circle" height={36} />
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
