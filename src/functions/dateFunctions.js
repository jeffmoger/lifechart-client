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
