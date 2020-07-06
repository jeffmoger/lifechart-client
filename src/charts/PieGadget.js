import React from 'react';
import { PieChart, Pie, Sector, Cell } from 'recharts';


function calcAvg(total=500, score){
	return total-score
}
const score = 384
const total = 500

const data = [
{name: 'Group A', value: score},
{name: 'Group B', value: calcAvg(total,score)}]

const COLORS = ['#666', '#303030'];

const RADIAN = Math.PI / 180;                    
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
 	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);
 
  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
    	{`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default class PieGadget extends React.Component{
  constructor(props) {
    super(props);
  }
  render () {
  	return (
    	<PieChart width={400} height={200} onMouseEnter={this.onPieEnter}>
        <Pie
          data={data} 
          cx={120} 
          cy={120} 
          labelLine={false}
          //label={renderCustomizedLabel}
          outerRadius={100} 
          fill="#8884d8"
          startAngle={180} 
          endAngle={0}
          stroke={'none'}
        >
        	{
          	data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
          }
        </Pie>
      </PieChart>
    );
  }
}

