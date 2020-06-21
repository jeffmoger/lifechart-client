import React, { PureComponent } from 'react';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const wrapperStyle = {
  backgroundColor: "#000000",
  opacity: 0.8,
  border: "1px solid #8884d8",
  textShadow: "1px 1px black"
};


export default class CalorieChart extends PureComponent {
  

  render() {
    const { calorieChart } = this.props.data.chartData
    return (
      <div className="chartContainer" style={{ width: '100%', height: 300, backgroundColor: "#333333", color: "#CCC" }}>
      <h4>Calories</h4>
        <ResponsiveContainer>
          <AreaChart width={730} height={350} data={calorieChart} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorBurned" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorConsumed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="date" stroke="#CCC" axisLine={false} tickLine={false} />
            <YAxis stroke="#CCC" axisLine={false} tickLine={false} />
            <CartesianGrid strokeDasharray="1 5" stroke="#111111" />
            <Tooltip contentStyle={wrapperStyle} />
            <Legend verticalAlign="top" iconType="circle" height={36} />
            <Area type="monotone" dataKey="Burned" stroke="#8884d8" fillOpacity={1} fill="url(#colorBurned)" />
            <Area type="monotone" dataKey="Consumed" stroke="#82ca9d" fillOpacity={1} fill="url(#colorConsumed)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
