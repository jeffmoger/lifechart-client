import moment from 'moment';

export default function dateRange(days, dateRange, forward) {
  let dateRangeArray;
  if (!dateRange) {
    dateRangeArray = noDateRange(days);
  }
  if (dateRange) {
    const [lastStart, lastEnd] = dateRange;
    let start = moment(lastStart).startOf('day');
    let end = moment(lastEnd).startOf('day');
    if (forward) {
      start.add(days, 'days');
      end.add(days, 'days');
    } else {
      start.subtract(days, 'days');
      end.subtract(days, 'days');
    }
    const [newStart, newEnd] = returnAsInt(start, end);
    const rangeString = returnRangeAsString(start, end);
    dateRangeArray = [newStart, newEnd, rangeString];
  }
  return dateRangeArray;
}

function noDateRange(days) {
  let end = moment().startOf('day');
  let start = moment(end).startOf('day');
  start.subtract(days - 1, 'days');
  const [newStart, newEnd] = returnAsInt(start, end);
  const rangeString = returnRangeAsString(start, end);
  return [newStart, newEnd, rangeString];
}

function returnAsInt(start, end) {
  const newStart = parseInt(start.format('x'), 10);
  const newEnd = parseInt(end.format('x'), 10);
  return [newStart, newEnd];
}

function returnRangeAsString(start, end) {
  const rangeString = start.format('MMM D') + ' - ' + end.format('MMM D');
  return rangeString;
}
