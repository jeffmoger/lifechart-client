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
  //const nutritionSugar = nutrition.filter((item) => item.key === 'sugar');
  const nutritionProtein = nutrition.filter((item) => item.key === 'protein');
  const nutritionCarbs = nutrition.filter((item) => item.key === 'carbs_total');
  const nutritionFat = nutrition.filter((item) => item.key === 'fat_total');

  const calorieScore =
    subtract(
      returnArrayByDate(caloriesBurned, 3, false).map(amount).reduce(sum),
      returnArrayByDate(nutritionCalories, 3, false).map(amount).reduce(sum)
    ) / 3;
  const netCalorieBurn = subtract(
    returnArrayByDate(caloriesBurned, 13, false).map(amount).reduce(sum),
    returnArrayByDate(nutritionCalories, 13, false).map(amount).reduce(sum)
  );
  const chartValues = {
    calorieScore,
    netCalorieBurn,
  };
  const dateArray = returnDateArray(setDateRange(14));
  console.log(dateArray);
  console.log(startToday());
  const chartDataArray = [];
  const chartNutritionArray = [];

  dateArray.forEach((date) => {
    let cb = caloriesBurned.find((item) => item.date === date);
    let cc = nutritionCalories.find((item) => item.date === date);
    let np = nutritionProtein.find((item) => item.date === date);
    let nc = nutritionCarbs.find((item) => item.date === date);
    let nf = nutritionFat.find((item) => item.date === date);

    cb ? (cb = cb.value) : (cb = 0);
    cc ? (cc = cc.value) : (cc = 0);
    np ? (np = np.value * 4) : (np = 0);
    nc ? (nc = nc.value * 4) : (nc = 0);
    nf ? (nf = nf.value * 9) : (nf = 0);

    if (date <= startToday()) {
      chartDataArray.push({
        date: moment(date).format('ddd D'),
        Consumed: cc,
        Burned: cb,
      });

      chartNutritionArray.push({
        date: moment(date).format('ddd D'),
        Protein: np,
        Fat: nf,
        Carbs: nc,
      });
    }
  });
  chartValues.calorieChart = chartDataArray;
  chartValues.nutritionChart = chartNutritionArray;

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
  const latest = arr.find((value) => value.date === parseInt(date));
  if (latest) return latest.value;
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
