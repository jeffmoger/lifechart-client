import moment from 'moment';
import setDateRange from './setDateRange';
import returnDateArray from './returnDateArray';

export default function loadChartData(dataObject) {
  const { data } = dataObject;
  const caloriesBurned = data['exercise'].arrays.CaloriesBurned;
  const activeMinutes = data['exercise'].arrays.ActiveMinutes;
  const stepCount = data['exercise'].arrays.StepCount;
  const nutrition = data['nutrition'].arrays.Nutrition;
  const nutritionCalories = nutrition.filter((item) => item.key === 'calories');
  const caloriesBurnedTotal = caloriesBurned.map(amount).reduce(sum);
  const nutritionCaloriesTotal = nutritionCalories.map(amount).reduce(sum);

  function calculateCalorieScore() {
    const start = startOfDay(moment().subtract(3, 'days'));
    const end = startOfDay(moment().subtract(1, 'days'));
    const nutritionCalorieScore = nutritionCalories.filter((item) => {
      return item.date >= start && item.date <= end;
    });
    const exerciseCalorieScore = caloriesBurned.filter((item) => {
      return item.date >= start && item.date <= end;
    });
    const nutritionCalorieScoreTotal = nutritionCalorieScore
      .map(amount)
      .reduce(sum);
    const exerciseCalorieScoreTotal = exerciseCalorieScore
      .map(amount)
      .reduce(sum);
    return subtract(exerciseCalorieScoreTotal, nutritionCalorieScoreTotal) / 3;
  }

  const chartValues = {
    caloriesBurnedAvg: avg(caloriesBurnedTotal, caloriesBurned),
    caloriesBurnedTotal: caloriesBurnedTotal,
    caloriesConsumedAvg: avg(nutritionCaloriesTotal, nutritionCalories),
    caloriesConsumedTotal: nutritionCaloriesTotal,
    calorieScore: calculateCalorieScore(),
    netCalorieBurn: subtract(caloriesBurnedTotal, nutritionCaloriesTotal),
  };
  const dateArray = returnDateArray(setDateRange(14));
  const chartDataArray = [];

  dateArray.forEach((date) => {
    let cb = caloriesBurned.find((item) => item.date === date);
    let cc = nutritionCalories.find((item) => item.date === date);

    if (cb) cb = cb.value;
    if (cc) cc = cc.value;

    if (cc || cb) {
      chartDataArray.push({
        date: moment(date).format('ddd D'),
        Consumed: cc,
        Burned: cb,
      });
    }
  });
  chartValues.calorieChart = chartDataArray;
  if (getLatestValue(stepCount, startToday())) {
    chartValues.stepCount = getLatestValue(stepCount, startToday());
  } else {
    chartValues.stepCount = data.stepCount;
  }
  if (getLatestValue(activeMinutes, startToday())) {
    chartValues.activeMinutes = getLatestValue(activeMinutes, startToday());
  } else {
    chartValues.activeMinutes = data.activeMinutes;
  }
  return chartValues;
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

function avg(total, array) {
  return Math.round(total / array.length);
}

function startToday() {
  const date = new Date();
  const start = moment(date).startOf('day');
  return moment(start).format('x');
}

function startOfDay(date) {
  const start = moment(date).startOf('day');
  return moment(start).format('x');
}

function getLatestValue(arr, date) {
  const value = arr.find((value) => value.date === parseInt(date));
  return value.value;
}
