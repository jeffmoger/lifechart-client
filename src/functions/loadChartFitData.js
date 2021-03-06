import { startToday } from './dateFunctions';
import dateRange from './dateRange';
import returnDateArray from './returnDateArray';

export default function loadChartFitData(fitData) {
  const data = fitData;
  const endDate = '';

  let caloriesBurned, activeMinutes, stepCount;
  if (data['exercise']) {
    caloriesBurned = data['exercise'].arrays.CaloriesBurned;
    activeMinutes = data['exercise'].arrays.ActiveMinutes;
    stepCount = data['exercise'].arrays.StepCount;
  }

  let nutrition,
    nutritionCalories,
    nutritionSugar,
    nutritionProtein,
    nutritionCarbs,
    nutritionFat;
  if (data['nutrition']) {
    nutrition = data['nutrition'].arrays.Nutrition;
    nutritionCalories = nutrition.filter((item) => item.key === 'calories');
    nutritionSugar = nutrition.filter((item) => item.key === 'sugar');
    nutritionProtein = nutrition.filter((item) => item.key === 'protein');
    nutritionCarbs = nutrition.filter((item) => item.key === 'carbs_total');
    nutritionFat = nutrition.filter((item) => item.key === 'fat_total');
  }

  const fitChartData = {};
  const dateArray = returnDateArray(dateRange(60, endDate));
  const chartDataArray = [];
  const chartNutritionArray = [];

  dateArray.forEach((date) => {
    let cb = caloriesBurned.find((item) => item.date === date);
    let cc = nutritionCalories.find((item) => item.date === date);
    let np = nutritionProtein.find((item) => item.date === date);
    let nc = nutritionCarbs.find((item) => item.date === date);
    let nf = nutritionFat.find((item) => item.date === date);
    let ns = nutritionSugar.find((item) => item.date === date);

    cb ? (cb = cb.value) : (cb = 0);
    cc ? (cc = cc.value) : (cc = 0);
    np ? (np = np.value * 4) : (np = 0);
    nc ? (nc = nc.value * 4) : (nc = 0);
    nf ? (nf = nf.value * 9) : (nf = 0);
    ns ? (ns = ns.value) : (ns = 0);

    if (date <= startToday()) {
      chartDataArray.push({
        //date: moment(date).format('ddd D'),
        date,
        Consumed: cc,
        Burned: cb,
      });

      chartNutritionArray.push({
        //date: moment(date).format('ddd D'),
        date,
        Protein: np,
        Fat: nf,
        Carbs: nc,
        Sugar: ns,
      });
    }
  });
  fitChartData.calorieChart = chartDataArray;
  fitChartData.nutritionChart = chartNutritionArray;

  if (getLatestValue(stepCount, startToday())) {
    fitChartData.stepCount = getLatestValue(stepCount, startToday());
  } else {
    fitChartData.stepCount = data.stepCount;
  }
  if (getLatestValue(activeMinutes, startToday())) {
    fitChartData.activeMinutes = getLatestValue(activeMinutes, startToday());
  } else {
    fitChartData.activeMinutes = data.activeMinutes;
  }

  return fitChartData;
}

function getLatestValue(arr, date) {
  const latest = arr.find((value) => value.date === parseInt(date));
  if (latest) return latest.value;
}
