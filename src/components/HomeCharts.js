import React, { useState, useEffect } from 'react';

import CalorieChart from '../charts/CalorieChart';
import NutritionChart from '../charts/NutritionChart';
import moveDataFromGoogle from '../functions/moveDataFromGoogle';
import dateRange from '../functions/dateRange';
import getData from '../functions/getData';
import loadChartData from '../functions/loadChartData';
import AverageCaloriesBurned from './AverageCaloriesBurned';
import StepCount from './StepCount';
import ActiveMinutes from './ActiveMinutes';
import NetCalorieBurn from './NetCalorieBurn';

const HomeCharts = (props) => {
  const { id, token } = JSON.parse(localStorage.getItem('tokens'));
  const [sync, setSync] = useState(JSON.parse(localStorage.getItem('sync')));
  const [staleData, setStaleData] = useState(false);
  const [lastFetch, setLastFetch] = useState('');
  const [newDateRange, setNewDateRange] = useState(dateRange(14));
  const [newCalorieChart, setNewCalorieChart] = useState([]);
  const [newNutritionChart, setNewNutritionChart] = useState([]);

  useEffect(() => {
    //const { calorieChart } = sync.chartData;
    const calorieChart = selectChartDataByRange(
      sync.chartData.calorieChart,
      newDateRange[0],
      newDateRange[1]
    );
    setNewCalorieChart(calorieChart);
    const nutritionChart = selectChartDataByRange(
      sync.chartData.nutritionChart,
      newDateRange[0],
      newDateRange[1]
    );
    setNewNutritionChart(nutritionChart);
  }, [newDateRange, sync]);

  useEffect(() => {
    setStaleData(checkLastFetched(1));
  }, [lastFetch]);

  useEffect(() => {
    if (staleData) {
      moveDataFromGoogle(id, token)
        .then((response) => {
          var dataObject = {};
          dataObject.syncReport = response;
          return dataObject;
        })
        .then(async (dataObject) => {
          dataObject.data = await getData(id, token);
          return dataObject;
        })
        .then((dataObject) => {
          dataObject.chartData = loadChartData(dataObject);
          const timestamp = new Date().getTime();
          dataObject.fetched = timestamp;
          localStorage.setItem('sync', JSON.stringify(dataObject));
          setStaleData(false);
          setLastFetch(timestamp);
          setSync(dataObject);
        })
        .catch((err) => console.log(err));
    }
  }, [id, token, staleData]);

  return (
    <div className="calories card">
      {sync ? (
        <>
          <CalorieChart data={newCalorieChart} />
          <br />
          <NutritionChart data={newNutritionChart} />
          <br />
          <section className="gadgets">
            <div className="container">
              <div>
                <AverageCaloriesBurned data={sync} />
              </div>
              <div>
                <NetCalorieBurn data={sync} />
              </div>
              <div>
                <StepCount data={sync} />
              </div>
              <div>
                <ActiveMinutes data={sync} />
              </div>
            </div>
          </section>
        </>
      ) : null}
    </div>
  );
};

function checkLastFetched(wait) {
  if (localStorage.getItem('sync') === null) return true;
  const { fetched } = JSON.parse(localStorage.getItem('sync'));
  const t = new Date().getTime();
  const w = wait * 60000;
  return fetched + w > t ? false : true;
}

function selectChartDataByRange(arr, start, end) {
  const newArray = arr.filter((item) => {
    return item.date >= start;
  });
  return newArray;
}

export default HomeCharts;
