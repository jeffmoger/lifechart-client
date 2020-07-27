import moment from 'moment';

export default function setDateRange(days, endDate) {
  let end = moment(endDate).startOf('day');
  if (!endDate) {
    end = moment().startOf('day');
  }
  //end.add(0, 'days'); //Set to 0 when realized it wasn't necessary to add a day. 07-25-20
  let start = moment(end).startOf('day');
  start.subtract(days - 1, 'days');
  const rangeString = start.format('ll') + ' until ' + end.format('ll');
  const intStart = parseInt(start.format('x'), 10);
  const intEnd = parseInt(end.format('x'), 10);
  return [intStart, intEnd, rangeString];
}
