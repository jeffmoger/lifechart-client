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
