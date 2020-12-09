import moment from 'moment';

export const createGadget = (data, days, includeToday, type, name) => {
  switch (true) {
    case name === 'calorieGadgets':
      return createCalorieGadget(data, days, includeToday, type);
    case name === 'sleepGadgets':
      return createSleepGadget(data, days, includeToday, type);
    default:
      return null;
  }
};

const createSleepGadget = (data, days, includeToday, type) => {
  const arr = returnArrayByDate(data, days, includeToday);
  const time = arr
    .map((sleep) => {
      if (sleep.Wake && sleep.Sleep) {
        return sleep.Wake - sleep.Sleep;
      } else {
        return 0;
      }
    })
    .filter((item) => item > 0);
  const totalMinutes = time.reduce(sum) / time.length / 60;
  const minutes = totalMinutes % 60;
  const hours = (totalMinutes - minutes) / 60;
  const scoreArr = [hours, Math.round(minutes)];
  return totalMinutes;
};

const getTimeSlept = (value) => {
  let [start, end] = value;
  let totalMinutes = end - start;
  let minutes = totalMinutes % 60;
  let hours = (totalMinutes - minutes) / 60;
  return `${hours} hrs, ${minutes} mins`;
};

const startOfDay = (date) => {
  const start = moment(date).startOf('day');
  return parseInt(moment(start).format('x'), 10);
};

function sumArray(array, days, includeToday) {
  return returnArrayByDate(array, days, includeToday).map(amount).reduce(sum);
}

function returnArrayByDate(arr, days, includeToday) {
  let subtractEnd = 1;
  includeToday ? (subtractEnd = 0) : (subtractEnd = 1);
  const start = startOfDay(moment().subtract(days, 'days'));
  const end = startOfDay(moment().subtract(subtractEnd, 'days'));
  const newArr = arr.filter((item) => {
    return item.date >= start && item.date <= end;
  });
  return newArr;
}

function amount(item) {
  return item.value;
}

function sum(prev, next) {
  return prev + next;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function separateArrays(data, properties = []) {
  const obj = {};
  if (properties.length > 0) {
    properties.forEach((property) => {
      obj[property] = [];
      data.forEach((item) => {
        obj[property].push({ date: item.date, value: item[property] });
      });
    });
  }
  return obj;
}

function getScore(minuend, subtrahend, days, includeToday, type) {
  if (days > 0) {
    const total = subtract(
      sumArray(minuend, days, includeToday),
      sumArray(subtrahend, days, includeToday)
    );
    if (type === 'total') return total;
    if (type === 'average') return total / days;
  }
}

const createCalorieGadget = (data, days, includeToday, type) => {
  const { Burned, Consumed } = separateArrays(data, ['Burned', 'Consumed']);
  return getScore(Burned, Consumed, days, includeToday, type);
};
