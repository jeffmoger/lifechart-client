import moveDataFromGoogle from './functions/moveDataFromGoogle'
import getData from './functions/getData';
import loadChartData from './functions/loadChartData'

function handleSync(id, token){
    moveDataFromGoogle(id, token)
    .then(async response => {
      var dataObject = {};
      dataObject.syncReport = response
      dataObject.data = await getData(id, token)
      return dataObject
    })
    .then(dataObject => {
      dataObject.chartData = loadChartData(dataObject.data);
      dataObject.fetched = new Date().getTime()
      //setDisplayResponse(dataObject.syncReport);
      //localStorage.setItem("sync", JSON.stringify(dataObject));
      return dataObject
    })
  }

  export default handleSync

