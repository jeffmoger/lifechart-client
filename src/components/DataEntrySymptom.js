import React, { useState, useEffect } from 'react';
import DisplaySymptomSelect from './DisplaySymptomSelect';
import { getSymptomList } from '../functions/apiCalls';
import DateTimePicker from './DateTimePicker';

export default function DataEntrySymptom({
  authTokens,
  handleSliderChange,
  setValues,
  setDisabled,
  setNote,
  setTimestamp,
}) {
  const { id, token } = authTokens;
  const [displayList, setDisplayList] = useState([]);
  const [symptom, setSymptom] = useState('');

  const handleCheckmark = (e) => {
    let updateList = [...displayList];
    const index = updateList.findIndex((x) => x.id === e.target.id);
    updateList[index].selected = e.target.checked;
    setDisplayList(updateList);
  };

  const handleNotes = (e) => {
    setNote(e.currentTarget.value);
  };

  useEffect(() => {
    getSymptomList(token).then((result) => {
      const showList = result.filter((item) => item.show === true);
      const newList = showList.map((item) => {
        item.selected = false;
        return item;
      });
      setDisplayList(newList);
    });
  }, [id, token, setValues]);

  useEffect(() => {
    const selected = displayList.filter((item) => item.selected === true);
    if (selected.length > 0) {
      let row = { name: selected[0].symptom };
      row.value = 1;
      setSymptom(row);
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [displayList, setDisabled]);

  useEffect(() => {
    setValues([symptom]);
  }, [symptom, setValues]);

  useEffect(() => {
    console.log(symptom);
  }, [symptom]);

  return (
    <div>
      <DisplaySymptomSelect
        displayList={displayList}
        handleSliderChange={handleSliderChange}
        handleCheckmark={handleCheckmark}
        handleNotes={handleNotes}
        symptom={symptom}
      />
      <DateTimePicker setTimestamp={setTimestamp} />
    </div>
  );
}
