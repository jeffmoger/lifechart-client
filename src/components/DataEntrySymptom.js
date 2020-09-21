import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DisplaySymptomSelect from './DisplaySymptomSelect';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '400px',
    marginTop: 50,
  },
});

export default function DataEntrySymptom({
  authTokens,
  handleSliderChange,
  setValues,
  setDisabled,
  setNote,
}) {
  const classes = useStyles();
  const { id, token } = authTokens;
  const [displayList, setDisplayList] = useState([]);
  const [symptom, setSymptom] = useState('');

  const getList = async (id, token) => {
    try {
      let res = await fetch(`${process.env.REACT_APP_API}/api/symptoms/read`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          authorization: 'Token ' + token,
          id: id,
        },
      });
      return await res.json();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckmark = (e) => {
    let updateList = [...displayList];
    const index = updateList.findIndex((x) => x.id === e.target.id);
    updateList[index].selected = e.target.checked;
    setDisplayList(updateList);
  };

  const handleNotes = (e) => {
    setNote(e.currentTarget.value);
  };

  const handleSlider = (e) => {
    //
  };

  useEffect(() => {
    getList(id, token).then((result) => {
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
        handleSlider={handleSlider}
        symptom={symptom}
      />
    </div>
  );
}
