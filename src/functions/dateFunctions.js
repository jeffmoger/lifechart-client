import moment from 'moment';

export const startToday = () => {
  const date = new Date();
  const start = moment(date).startOf('day');
  return parseInt(moment(start).format('x'), 10);
};

export const startOfDay = (date) => {
  const start = moment(date).startOf('day');
  return parseInt(moment(start).format('x'), 10);
};

export const nowMillis = () => {
  const date = new Date();
  return parseInt(moment(date).format('x'), 10);
};

export const dateMillis = (date) => {
  return parseInt(moment(date).format('x'), 10);
};

export const startTodaySeconds = () => {
  const date = new Date();
  const start = moment(date).startOf('day');
  return parseInt(moment(start).format('X'), 10);
};

export const labelHour = (date) => {
  return moment(date * 1000).format('h a');
};

export const labelFormat = (date) => {
  return moment(date * 1000).format('h:mm');
};

export const subtractDaysFromDate = (today, days) => {
  // Return date in milliseconds
  return Number(moment(today).subtract(days, 'days').format('x'));
};

export const getDateRangeString = (date = startToday(), days = 60) => {
  const startDate = moment(subtractDaysFromDate(date, days)).format(
    'YYYY-MM-DD'
  );
  const endDate = moment(date).format('YYYY-MM-DD');
  return `${startDate}_${endDate}`;
};

export const startOfTomorrow = () => {
  return parseInt(
    moment(new Date()).add(1, 'days').startOf('day').format('x'),
    10
  );
};
