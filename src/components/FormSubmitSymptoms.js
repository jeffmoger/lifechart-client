import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DisplaySymptomList from './DisplaySymptomList';

const useStyles = makeStyles((theme) => ({
  formRoot: {
    margin: theme.spacing(1),
    width: '100%',
  },
  enterNewDiv: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  textField: {
    alignSelf: 'bottom',
    marginBottom: 15,
    marginRight: 10,
    flexGrow: 1,
  },
  displayList: {
    flexGrow: 1,
    marginBottom: 30,
  },
  table: {
    marginBottom: 30,
  },
  submit: {
    alignSelf: 'center',
  },
}));

export default function FormSubmitSymptoms(props) {
  const classes = useStyles();
  const [disabled, setDisabled] = useState(true);
  const [input, setInput] = useState('');
  const [displayList, setDisplayList] = useState([]);
  const { id, token } = props;

  const submitSaveSymptoms = async (event) => {
    event.preventDefault();
    await saveSymptom(props.id, props.token, {
      symptom: input,
    });
    await getList(id, token).then((result) => setDisplayList(result));
    setInput('');
  };

  const handleInputChange = (e) => {
    setInput(e.currentTarget.value);
  };

  const saveSymptom = async (id, token, body) => {
    try {
      let res = await fetch(
        `${process.env.REACT_APP_API}/api/symptoms/create`,
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            authorization: 'Token ' + token,
            id: id,
          },
          body: JSON.stringify(body),
        }
      );
      return await res.json();
    } catch (error) {
      console.log(error);
    }
  };

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

  const updateSymptom = async (item, token, body) => {
    try {
      let res = await fetch(
        `${process.env.REACT_APP_API}/api/symptoms/update`,
        {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
            authorization: 'Token ' + token,
            id: item,
          },
          body: JSON.stringify(body),
        }
      );
      return await res.json();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSymptom = async (item, token) => {
    try {
      let res = await fetch(
        `${process.env.REACT_APP_API}/api/symptoms/delete`,
        {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json',
            authorization: 'Token ' + token,
            id: item,
          },
        }
      );
      return await res.json();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSwitch = async (e) => {
    let updateList = [...displayList];
    const index = updateList.findIndex((x) => x.id === e.target.id);
    const body = { show: e.target.checked };
    updateList[index].show = e.target.checked;
    await updateSymptom(e.target.id, token, body).then((result) => {
      updateList[index].updatedAt = result.updatedAt;
      setDisplayList(updateList);
    });
  };

  const handleDelete = async (e) => {
    await deleteSymptom(e.currentTarget.name, token);
    await getList(id, token).then((result) => {
      setDisplayList(result);
    });
  };

  useEffect(() => {
    input.length > 2 ? setDisabled(false) : setDisabled(true);
  }, [input]);

  useEffect(() => {
    getList(id, token).then((result) => {
      setDisplayList(result);
    });
  }, [id, token]);

  return (
    <>
      <form
        onSubmit={submitSaveSymptoms}
        className={classes.formRoot}
        noValidate
        autoComplete="off"
      >
        <DisplaySymptomList
          displayList={displayList}
          handleSwitch={handleSwitch}
          handleDelete={handleDelete}
        />

        <div className={classes.enterNewDiv}>
          <TextField
            id="symptomName"
            label="Create New Symptom"
            className={classes.textField}
            value={input}
            onChange={handleInputChange}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className={classes.submit}
            disabled={disabled}
          >
            Submit
          </Button>
        </div>
      </form>
    </>
  );
}
