import React, { useState, useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import CalorieChart from '../charts/CalorieChart';
import MoodChart from '../charts/MoodChart';
import NutritionChart from '../charts/NutritionChart';
import SleepChart from '../charts/SleepChart';
import SymptomChart from '../charts/SymptomChart';
import WeightChart from '../charts/WeightChart';

import ActiveMinutes from './ActiveMinutes';
import AverageCaloriesBurned from './AverageCaloriesBurned';
import DisplayDateRange from './DisplayDateRange';
import Loader from './Loader';
import NetCalorieBurn from './NetCalorieBurn';
import SpeedDial from './SpeedDial';
import StepCount from './StepCount';

import { getSymptomList, getProfile } from '../functions/apiCalls';
import { startToday, getDateRangeString } from '../functions/dateFunctions';
import newDateRange from '../functions/dateRange';
import getData from '../functions/getData';
import getItemData from '../functions/getItemData';
import loadChartItemData from '../functions/loadChartItemData';
import loadChartFitData from '../functions/loadChartFitData';
import moveDataFromGoogle from '../functions/moveDataFromGoogle';
import returnDateArray from '../functions/returnDateArray';

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

function generateEmptyData(dateRange, arr) {
  const dateArray = returnDateArray(dateRange);
  const newArray = dateArray.map((date) => {
    let obj = {
      date,
    };
    arr.forEach((item) => {
      obj[item] = 0;
    });
    return obj;
  });
  return newArray;
}

const HomeCharts = (props) => {
  const {
    token,
    googleFit,
    dataSourceIds: profileDataSource,
  } = props.authTokens;
  const { demo } = props;
  const [dataSourceIds, setDataSourceIds] = useState([]);
  const [profile, setProfile] = useState('');
  const [fitChart, setFitChart] = useState('');
  const [itemChart, setItemChart] = useState(
    localStorageDefault('itemChartData', '')
  );
  const [staleData, setStaleData] = useState(false);
  const [staleItems, setStaleItems] = useState(true);
  const [lastFetch, setLastFetch] = useState('');
  const [dateRange, setDateRange] = useState(() =>
    newDateRange(dateRangeLength)
  );
  const [calorieChart, setCalorieChart] = useState(() =>
    generateEmptyData(newDateRange(dateRangeLength), ['Consumed', 'Burned'])
  );
  const [nutritionChart, setNutritionChart] = useState(
    generateEmptyData(newDateRange(dateRangeLength), [
      'Protein',
      'Fat',
      'Carbs',
    ])
  );
  const [moodChart, setMoodChart] = useState([]);
  const [sleepChart, setSleepChart] = useState([]);
  const [weightChart, setWeightChart] = useState([]);
  const [symptomChart, setSymptomChart] = useState([]);
  const [symptomList, setSymptomList] = useState([]);
  const [gadgets, setGadgets] = useState('');
  const [showItems, setShowItems] = useState(false);

  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState('');
  const [message, setMessage] = useState('');

  function previousDateRange() {
    setDateRange(newDateRange(dateRangeLength, dateRange));
  }
  function nextDateRange() {
    setDateRange(newDateRange(dateRangeLength, dateRange, true));
  }

  function refreshAfterSubmit() {
    setStaleItems(true);
  }

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  //useEffects_____________________________________________________________

  //useEffect(() => {
  //  console.log(sleepChart);
  //}, [sleepChart]);

  useEffect(() => {
    if (profileDataSource) {
      if (profileDataSource.length > 0) {
        setDataSourceIds(profileDataSource);
        setFitChart(localStorageDefault('fitChartData', ''));
      }
    }
  }, [profileDataSource]);

  useEffect(() => {
    setStaleData(checkLastFetched(1, lastFetch));
  }, [lastFetch]);

  useEffect(() => {
    const updateProfileState = async () => {
      await getProfile(token).then((result) => setProfile(result));
    };
    if (!profile) updateProfileState();
  }, [profile, token]);

  useEffect(() => {
    const symptoms = async (token) => {
      let symptoms = await getSymptomList(token);
      let activeSymptoms = symptoms.filter(
        (result) => result.active === true && result.show === true
      );
      setSymptomList(activeSymptoms);
    };
    symptoms(token);
  }, [token]);

  useEffect(() => {
    if (staleData && dataSourceIds.length > 0) {
      moveDataFromGoogle(token, getDataTypeNamesAsString(dataSourceIds))
        .then((response) => {
          var dataObject = {};
          dataObject.syncReport = response;
          return dataObject;
        })
        .then(async () => {
          const fitData = await getData(
            token,
            getDateRangeString(),
            getDataTypeNamesAsString(dataSourceIds)
          );
          setLastFetch(new Date().getTime());
          setFitChart(loadChartFitData(fitData));
          setStaleData(false);
        })
        .catch((err) => console.log(err));
    }
  }, [staleData, token, dataSourceIds]);

  useEffect(() => {
    if (fitChart) {
      const {
        calorieChart,
        nutritionChart,
        calorieScore,
        netCalorieBurn,
        stepCount,
        activeMinutes,
      } = fitChart;
      const [start, end] = dateRange;
      setCalorieChart(selectChartDataByRange(calorieChart, start, end));
      setNutritionChart(selectChartDataByRange(nutritionChart, start, end));
      setGadgets({ calorieScore, netCalorieBurn, stepCount, activeMinutes });
    }
  }, [fitChart, dateRange]);

  useEffect(() => {
    const getItems = async () => {
      await getItemData(token, getDateRangeString()).then((result) => {
        //TODO: nonreplicable type error occurring in loadChartItemData
        setItemChart(loadChartItemData(result));
      });
    };
    if (staleItems) {
      getItems().then(() => setStaleItems(false));
    }
  }, [staleItems, token]);

  useEffect(() => {
    if (itemChart) {
      const { moodChart, weightChart, symptomChart, sleepChart } = itemChart;
      const [start, end] = dateRange;
      setMoodChart(selectChartDataByRange(moodChart, start, end));
      setWeightChart(selectChartDataByRange(weightChart, start, end));
      setSymptomChart(selectChartDataByRange(symptomChart, start, end));
      setSleepChart(selectChartDataByRange(sleepChart, start, end));
    }
  }, [itemChart, dateRange]);

  useEffect(() => {
    if (!demo) {
      localStorage.setItem('fitChartData', JSON.stringify(fitChart));
      localStorage.setItem('itemChartData', JSON.stringify(itemChart));
    }
  }, [demo, fitChart, itemChart]);

  useEffect(() => {
    if (googleFit && itemChart) {
      setShowItems(true);
    }
  }, [itemChart, googleFit]);

  return (
    <div className="homeCharts">
      {showItems ? (
        <>
          <DisplayDateRange
            dateRange={dateRange}
            previousDateRange={previousDateRange}
            nextDateRange={nextDateRange}
            nextDisabled={checkNextDisabled(dateRange)}
            previousDisabled={checkPreviousDisabled(fitChart, dateRange)}
          />
          {dataSourceIds.length > 0 && calorieChart.length > 0 && (
            <CalorieChart data={calorieChart} />
          )}
          {dataSourceIds.length > 0 && nutritionChart.length > 0 && (
            <NutritionChart data={nutritionChart} />
          )}
          {moodChart.length > 0 && <MoodChart data={moodChart} />}
          {sleepChart.length > 0 && <SleepChart data={sleepChart} />}
          {symptomList.length > 0 && symptomChart.length > 0 && (
            <SymptomChart data={symptomChart} symptoms={symptomList} />
          )}
          {weightChart.length > 0 && <WeightChart data={weightChart} />}
          {gadgets && (
            <section className="gadgets">
              <div className="container">
                <div>
                  <AverageCaloriesBurned calorieScore={gadgets.calorieScore} />
                </div>
                <div>
                  <NetCalorieBurn netCalorieBurn={gadgets.netCalorieBurn} />
                </div>
                <div>
                  <StepCount stepCount={gadgets.stepCount} />
                </div>
                <div>
                  <ActiveMinutes activeMinutes={gadgets.activeMinutes} />
                </div>
              </div>
            </section>
          )}
        </>
      ) : (
        <Loader />
      )}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
      <SpeedDial
        refreshAfterSubmit={refreshAfterSubmit}
        profile={profile}
        authTokens={props.authTokens}
        setSnackOpen={setOpen}
        setSnackMessage={setMessage}
        setSnackSeverity={setSeverity}
      />
    </div>
  );
};

function checkLastFetched(wait, lastFetch) {
  //if (localStorage.getItem('sync') === null) return true;
  //const { fetched } = JSON.parse(localStorage.getItem('sync'));
  if (!lastFetch) return true;
  const t = new Date().getTime();
  const w = wait * 60000;
  return lastFetch + w > t ? false : true;
}

function checkNextDisabled(dateRangeArray) {
  const { 1: end } = dateRangeArray;
  const today = startToday();
  if (today === end) {
    return true;
  }
}

function checkPreviousDisabled(fitChart, dateRangeArray) {
  if (fitChart) {
    const [start] = dateRangeArray;
    const { 0: firstDay } = fitChart.calorieChart;
    if (firstDay.date >= start) {
      return true;
    }
  }
}

function getDataTypeNamesAsString(dataSourceIds) {
  const newArray = dataSourceIds.map((item) => {
    return item.dataTypeName;
  });
  return newArray.join();
}

export default HomeCharts;
