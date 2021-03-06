import React, { useState, useEffect } from 'react';
import CalorieChart from '../charts/CalorieChart';
import { startToday, getDateRangeString } from '../functions/dateFunctions';
import NutritionChart from '../charts/NutritionChart';
import MoodChart from '../charts/MoodChart';
import SymptomChart from '../charts/SymptomChart';
import WeightChart from '../charts/WeightChart';
import SleepChart from '../charts/SleepChart';
import newDateRange from '../functions/dateRange';
import AverageCaloriesBurned from './AverageCaloriesBurned';
import StepCount from './StepCount';
import ActiveMinutes from './ActiveMinutes';
import NetCalorieBurn from './NetCalorieBurn';
import DisplayDateRange from './DisplayDateRange';
import SpeedDial from './SpeedDial';
import Loader from './Loader';
import { getSymptomList } from '../functions/apiCalls';

const dateRangeLength = 15;

function localStorageDefault(key, defaultValue) {
  const stickyData = localStorage.getItem(key);
  return stickyData !== null ? JSON.parse(stickyData) : defaultValue;
}

function selectChartDataByRange(arr, start, end) {
  if (arr) {
    const newArray = arr.filter((item) => {
      return item.date >= start && item.date <= end;
    });
    return newArray;
  } else {
    return [];
  }
}

const HomeCharts = (props) => {
  const { id, token } = props.authTokens;
  const [sync, setSync] = useState(localStorageDefault('sync', ''));
  const [staleData, setStaleData] = useState(false);
  const [lastFetch, setLastFetch] = useState('');
  const [dateRange, setDateRange] = useState(newDateRange(dateRangeLength));
  const [calorieChart, setCalorieChart] = useState([]);
  const [nutritionChart, setNutritionChart] = useState([]);
  const [moodChart, setMoodChart] = useState([]);
  const [sleepChart, setSleepChart] = useState([]);
  const [weightChart, setWeightChart] = useState([]);
  const [symptomChart, setSymptomChart] = useState([]);
  const [symptomList, setSymptomList] = useState([]);

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
    const symptoms = async (token) => {
      let symptoms = await getSymptomList(token);
      setSymptomList(symptoms);
    };
    symptoms(token);
  }, [token]);

  useEffect(() => {
    if (sync) {
      const {
        calorieChart,
        nutritionChart,
        moodChart,
        weightChart,
        symptomChart,
        sleepChart,
      } = sync.chartData;
      const [start, end] = dateRange;
      setCalorieChart(selectChartDataByRange(calorieChart, start, end));
      setNutritionChart(selectChartDataByRange(nutritionChart, start, end));
      setMoodChart(selectChartDataByRange(moodChart, start, end));
      setWeightChart(selectChartDataByRange(weightChart, start, end));
      setSymptomChart(selectChartDataByRange(symptomChart, start, end));
      setSleepChart(selectChartDataByRange(sleepChart, start, end));
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
          <MoodChart data={moodChart} />
          <br />
          <SleepChart data={sleepChart} />
          <br />
          {symptomList.length > 0 && (
            <SymptomChart data={symptomChart} symptoms={symptomList} />
          )}
          <WeightChart data={weightChart} />
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
