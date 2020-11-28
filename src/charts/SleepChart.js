import React, { PureComponent } from 'react';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from 'recharts';
import { chartColors } from '../functions/chartColors';

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

const formatToolTip = (value, name) => {
  let [start, end] = value;
  let totalMinutes = end - start;
  let minutes = totalMinutes % 60;
  let hours = (totalMinutes - minutes) / 60;
  return `${hours} hrs, ${minutes} mins`;
};

const formatYAxis = (tickItem) => {
  if (tickItem) {
    let timetable = sleepTable();
    let minutes = tickItem % 60;
    let hours = tickItem - minutes;
    let hours2 = hours / 60;
    let [realHour] = timetable.filter((x) => hours2 === x.id);
    if (realHour) {
      let showHour = realHour.hour;

      if (minutes < 10) {
        minutes = '0' + minutes.toString();
      }
      if (minutes % 10) {
        minutes = minutes - (minutes % 10);
      }
      if (minutes === 0) minutes = '00';

      return `${showHour}:${minutes}`;
    }
  }
};

const formatSleep = (data) => {
  return data.map((item) => {
    const { Sleep, Wake } = item;
    let s, w, sm, wm;
    Sleep ? (s = Number(moment(Sleep * 1000).format('H'))) : (s = null);
    Wake ? (w = Number(moment(Wake * 1000).format('H'))) : (w = null);
    Sleep ? (sm = Number(moment(Sleep * 1000).format('mm'))) : (s = null);
    Wake ? (wm = Number(moment(Wake * 1000).format('mm'))) : (w = null);

    let ss = table.find((x) => s === x.hour);
    let ww = table.find((x) => w === x.hour);
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
    const colors = chartColors(this.props.palette);
    const { sleepChart: theme, styles, type, wrapperStyle } = colors;
    return (
      <div className={`${type && type + '-'}chartContainer`}>
        <Typography variant="h6" component="h2" align="center">
          Sleep Patterns
        </Typography>
        <ResponsiveContainer>
          <BarChart
            width={730}
            height={300}
            data={newData}
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
            <ReferenceLine y={240} stroke="#333333" />
            <ReferenceLine y={720} stroke="#333333" />
            <Tooltip
              contentStyle={wrapperStyle}
              cursor={theme.toolTip.cursor}
              labelFormatter={formatToolTipLabel}
              formatter={formatToolTip}
            />
            <Legend verticalAlign="bottom" iconType="circle" height={36} />
            <Bar
              dataKey="sleep"
              fill={theme.sleep}
              fillOpacity={0.6}
              barSize={10}
              radius={[10, 10, 10, 10]}
            />
            <YAxis
              type="number"
              //scale="time"
              stroke={styles.axisY}
              axisLine={false}
              tickLine={false}
              orientation="left"
              width={35}
              mirror={true}
              //interval={0}
              ticks={[240, 720]}
              domain={[120, 'dataMax + 30']}
              tickFormatter={formatYAxis}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
