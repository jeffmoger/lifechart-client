import React, { useState, useEffect } from 'react';
import CalorieChart from '../charts/CalorieChart';
import { startToday, getDateRangeString } from '../functions/dateFunctions';
import NutritionChart from '../charts/NutritionChart';
import moveDataFromGoogle from '../functions/moveDataFromGoogle';
import newDateRange from '../functions/dateRange';
import getData from '../functions/getData';
import getItemData from '../functions/getItemData';
import loadChartData from '../functions/loadChartData';
import AverageCaloriesBurned from './AverageCaloriesBurned';
import StepCount from './StepCount';
import ActiveMinutes from './ActiveMinutes';
import NetCalorieBurn from './NetCalorieBurn';
import DisplayDateRange from './DisplayDateRange';
import SpeedDial from './SpeedDial';
import Loader from './Loader';

const dateRangeLength = 15;

function localStorageDefault(key, defaultValue) {
  const stickyData = localStorage.getItem(key);
  return stickyData !== null ? JSON.parse(stickyData) : defaultValue;
}

function selectChartDataByRange(arr, start, end) {
  const newArray = arr.filter((item) => {
    return item.date >= start && item.date <= end;
  });
  return newArray;
}

const HomeCharts = (props) => {
  const { id, token } = props.authTokens;
  const [sync, setSync] = useState(localStorageDefault('sync', ''));
  const [staleData, setStaleData] = useState(false);
  const [lastFetch, setLastFetch] = useState('');
  const [dateRange, setDateRange] = useState(newDateRange(dateRangeLength));
  const [calorieChart, setCalorieChart] = useState([]);
  const [nutritionChart, setNutritionChart] = useState([]);

  function previousDateRange() {
    setDateRange(newDateRange(dateRangeLength, dateRange));
  }
  function nextDateRange() {
    setDateRange(newDateRange(dateRangeLength, dateRange, true));
  }

  function refreshAfterSubmit() {
    window.location.reload();
    //setStaleData(true);
  }

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
          dataObject.data = await getData(token, getDateRangeString());
          return dataObject;
        })
        .then(async (dataObject) => {
          dataObject.items = await getItemData(token, getDateRangeString());
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

  useEffect(() => {
    if (sync) {
      const { calorieChart, nutritionChart } = sync.chartData;
      const [start, end] = dateRange;
      setCalorieChart(selectChartDataByRange(calorieChart, start, end));
      setNutritionChart(selectChartDataByRange(nutritionChart, start, end));
    }
  }, [dateRange, sync]);

  return (
    <div className="homeCharts">
      {sync ? (
        <>
          <DisplayDateRange
            dateRange={dateRange}
            previousDateRange={previousDateRange}
            nextDateRange={nextDateRange}
            nextDisabled={checkNextDisabled(dateRange)}
            previousDisabled={checkPreviousDisabled(sync, dateRange)}
          />
          <CalorieChart data={calorieChart} />
          <br />
          <NutritionChart data={nutritionChart} />
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
      ) : (
        <Loader />
      )}
      <SpeedDial
        refreshAfterSubmit={refreshAfterSubmit}
        profile={props.profile}
        authTokens={props.authTokens}
      />
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

function checkNextDisabled(dateRangeArray) {
  const { 1: end } = dateRangeArray;
  const today = startToday();
  if (today === end) {
    return true;
  }
}

function checkPreviousDisabled(sync, dateRangeArray) {
  if (sync) {
    const [start] = dateRangeArray;
    const { 0: firstDay } = sync.chartData.calorieChart;
    if (firstDay.date >= start) {
      return true;
    }
  }
}

export default HomeCharts;
