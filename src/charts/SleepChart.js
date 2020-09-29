import React, { PureComponent } from 'react';
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

const wrapperStyle = {
  backgroundColor: '#000000',
  opacity: 0.8,
  border: '1px solid #8884d8',
  textShadow: '1px 1px black',
};

const sleepTable = () => {
  let hours = 24;
  let start = 20;
  let end = 10;
  let range = Array.from(Array(hours), (x, index) => index + 1);

  const adjust = (num, start) => {
    if (num + start <= 24) {
      return num + start - 1;
    } else {
      return num - (hours - start + 1);
    }
  };
  const hourArr = range.map((item) => {
    let id = item;
    let hour = adjust(item, start);
    let show;
    hour >= start || hour <= end ? (show = true) : (show = false);
    let obj = {
      id,
      hour,
      show: show,
    };
    return obj;
  });
  return hourArr;
};

const table = sleepTable();

const formatXAxis = (tickItem) => {
  return moment(tickItem).format('ddd D');
};
const formatToolTipLabel = (label) => {
  return moment(label).format('MMMM D, YYYY');
};

const formatYAxis = (tickItem) => {
  let timetable = sleepTable();
  let minutes = tickItem % 60;
  let hours = tickItem - minutes;
  let hours2 = hours / 60;
  let [realHour] = timetable.filter((x) => hours2 === x.id);
  let showHour = realHour.hour;
  if (minutes === 0) minutes = '00';
  if (minutes.length === 1) minutes = '0' + minutes;
  return `${showHour}:${minutes}`;
  //return moment(tickItem).format('hh:mm');
};

const formatSleep = (data) => {
  return data.map((item) => {
    const { Sleep, Wake } = item;
    let s, w, sm, wm;
    Sleep ? (s = Number(moment(Sleep * 1000).format('H'))) : (s = null);
    Wake ? (w = Number(moment(Wake * 1000).format('H'))) : (w = null);
    Sleep ? (sm = Number(moment(Sleep * 1000).format('mm'))) : (s = null);
    Wake ? (wm = Number(moment(Wake * 1000).format('mm'))) : (w = null);

    let [ss] = table.filter((x) => s === x.hour);
    let [ww] = table.filter((x) => w === x.hour);
    let obj = {
      date: item.date,
    };
    if (Sleep && Wake) {
      let ssid = ss.id * 60 + sm;
      let wwid = ww.id * 60 + wm;
      obj.sleep = [ssid, wwid];
    }
    return obj;
  });
};

export default class SleepChart extends PureComponent {
  render() {
    const sleepChart = this.props.data;
    const newData = formatSleep(sleepChart);
    return (
      <div
        className="chartContainer"
        style={{ maxWidth: 960, height: 300, color: '#CCC' }}
      >
        <ResponsiveContainer>
          <BarChart
            width={730}
            height={300}
            data={newData}
            syncId="anyId"
            margin={{ top: 20, right: 5, left: 5, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="1 3" stroke="#202020" />
            <XAxis
              dataKey="date"
              stroke="#CCC"
              axisLine={false}
              tickLine={false}
              mirror={false}
              tickFormatter={formatXAxis}
            />
            <YAxis
              //type="number"
              //scale="time"
              stroke="#CCC"
              axisLine={false}
              tickLine={false}
              orientation="left"
              width={35}
              mirror={false}
              interval="preserveEnd"
              domain={['auto', 'auto']}
              tickFormatter={formatYAxis}
            />
            <Tooltip
              contentStyle={wrapperStyle}
              cursor={{ fill: '#232323', stroke: '#222', strokeWidth: 0 }}
              labelFormatter={formatToolTipLabel}
            />
            <Legend verticalAlign="top" iconType="circle" height={36} />
            <Bar
              dataKey="sleep"
              fill="#367d51"
              fillOpacity={0.6}
              barSize={15}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
