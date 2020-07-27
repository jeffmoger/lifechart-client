import moment from 'moment';

export default function returnDateArray(dateRangeArray) {
  const [start, end] = dateRangeArray;
  //console.log(dateRange);
  for (
    var arr = [], dt = new Date(start);
    dt <= end;
    dt.setDate(dt.getDate() + 1)
  ) {
    arr.push(parseInt(moment(dt).format('x')));
  }
  return arr;
}
