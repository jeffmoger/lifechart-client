import React, { PureComponent } from 'react';
import { ResponsiveContainer, AreaChart, Area, YAxis } from 'recharts';

export default class ChartForHomePage extends PureComponent {
  render() {
    const { data, colors } = this.props;
    const { stroke, fill } = colors;
    return (
      <ResponsiveContainer>
        <AreaChart
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          data={data}
        >
          <defs>
            <linearGradient id="a" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={fill} stopOpacity={1} />
              <stop offset="100%" stopColor={fill} stopOpacity={1} />
            </linearGradient>
          </defs>
          <YAxis hide={true} type="number" domain={[0, 'dataMax + 5']} />
          <Area
            type="monotone"
            dataKey="a"
            stroke={stroke}
            strokeWidth="2"
            dot={false}
            fillOpacity={1}
            fill="url(#a)"
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}
