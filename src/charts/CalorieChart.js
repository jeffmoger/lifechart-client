import React, { PureComponent } from 'react';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine
} from 'recharts';

const wrapperStyle = {
  backgroundColor: "#000000",
  opacity: 0.8,
  border: "1px solid #8884d8",
  textShadow: "1px 1px black"
};

const palette = {
  purple: {
    burned: '#8884d8',
    consumed: '#82ca9d'
  }
}

const theme = palette.purple





export default class CalorieChart extends PureComponent {
  
  render() {
    const { calorieChart } = this.props.data.chartData
    return (
      <div className="chartContainer" style={{ width: '100%', height: 300, color: "#CCC" }}>
      <h4>Calories</h4>
        <ResponsiveContainer>
          <AreaChart width={730} height={350} data={calorieChart} margin={{ top: 20, right: 5, left: 5, bottom: 20 }}>
            <defs>
              <linearGradient id="colorBurned" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={theme.burned} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={theme.burned} stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorConsumed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={theme.consumed} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={theme.consumed} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="date" stroke="#CCC" axisLine={false} tickLine={false} mirror={true}  />
            <YAxis stroke="#CCC" axisLine={false} tickLine={false} orientation="left" width={35} mirror={true} interval="preserveEnd" />

            <CartesianGrid strokeDasharray="1 3" stroke="#202020" />
            <Tooltip contentStyle={wrapperStyle} />
            <Legend verticalAlign="top" iconType="circle" height={36} />
            <Area type="monotone" dataKey="Burned" stroke={theme.burned} fillOpacity={1} fill="url(#colorBurned)" />
            <Area type="monotone" dataKey="Consumed" stroke={theme.consumed} fillOpacity={1} fill="url(#colorConsumed)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
