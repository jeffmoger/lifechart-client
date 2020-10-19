export default function loadChartItemData(itemsData) {
  const items = itemsData;

  const [itemsMood] = items.filter(
    (item) => item.dataTypeName === 'lifechart.mood.item'
  );
  const [itemsSymptom] = items.filter(
    (item) => item.dataTypeName === 'lifechart.symptom.item'
  );
  const [itemsWeight] = items.filter(
    (item) => item.dataTypeName === 'lifechart.weight.item'
  );
  const [itemsSleep] = items.filter(
    (item) => item.dataTypeName === 'lifechart.sleep.item'
  );

  const itemChartData = {};

  itemChartData.moodChart = generateItemsChart(itemsMood);
  itemChartData.symptomChart = generateItemsChart(itemsSymptom);
  itemChartData.weightChart = generateItemsChart(itemsWeight);
  itemChartData.sleepChart = generateItemsChart(itemsSleep);

  return itemChartData;
}

//_________________________________________________________________

const getKeyValue = (key, items) => {
  let keyArray = items.filter((item) => item.key === key);
  if (keyArray.length > 0) {
    var value = keyArray.reduce(function (prev, cur) {
      return prev + cur.value;
    }, 0);
    let number = value / keyArray.length;
    return Number(number.toFixed(1));
  } else {
    return 0;
  }
};
const generateItemsChart = (data) => {
  if (data) {
    const { dataSet } = data;
    const newArray = [];
    dataSet.forEach((item) => {
      const { items } = item;
      let obj = {
        date: item.startTimeMillis,
      };
      if (items.length > 0) {
        const keys = [...new Set(items.map((x) => x.key))];
        keys.forEach((key) => {
          obj[key] = getKeyValue(key, items);
        });
      }
      newArray.push(obj);
    });
    return newArray;
  } else {
    return;
  }
};
