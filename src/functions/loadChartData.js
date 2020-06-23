import moment from 'moment';
import setDateRange from './setDateRange'
import returnDateArray from './returnDateArray'

export default function loadChartData(dataObject){
    const { data } = dataObject
    const caloriesBurned = data["exercise"].arrays.CaloriesBurned
    //const activeMinutes = data["exercise"].arrays.ActiveMinutes
    //const stepCount = data["exercise"].arrays.StepCount
    const nutrition = data["nutrition"].arrays.Nutrition
    const nutritionCalories = nutrition.filter(item => item.key==='calories')
    const caloriesBurnedTotal = caloriesBurned.map(amount).reduce(sum);
    const nutritionCaloriesTotal = nutritionCalories.map(amount).reduce(sum);
    const chartValues = {
      caloriesBurnedAvg: avg(caloriesBurnedTotal,caloriesBurned),
      caloriesBurnedTotal: caloriesBurnedTotal,
      caloriesConsumedAvg: avg(nutritionCaloriesTotal,nutritionCalories),
      caloriesConsumedTotal: nutritionCaloriesTotal
    } 
    const dateArray = returnDateArray(setDateRange(14))
    const chartDataArray = []
    
    dateArray.forEach(date => {
      let cb = caloriesBurned.find(item => item.date===date)
      let cc = nutritionCalories.find(item => item.date===date)
      
      if (cb) cb=cb.value
      if (cc) cc=cc.value
  
      if (cc || cb) {
        chartDataArray.push({
          date: moment(date).format('ddd D'),
          "Consumed": cc,
          "Burned": cb
        })
      }
    })
    chartValues.calorieChart = chartDataArray
    return chartValues
  }

  function amount(item){
    return item.value
  }
  function sum(prev, next){
    return prev + next;
  }
  function avg(total,array) {
    return Math.round(total/array.length)
  }


  
