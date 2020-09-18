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

  useEffect(() => {
    input.length > 2 ? setDisabled(false) : setDisabled(true);
  }, [input]);

  useEffect(() => {
    getList(id, token).then((result) => {
      setDisplayList(result);
    });
  }, [id, token]);

  useEffect(() => {
    console.log(displayList);
  }, [displayList]);

  return (
    <>
      <form
        onSubmit={submitSaveSymptoms}
        className={classes.formRoot}
        noValidate
        autoComplete="off"
      >
        <DisplaySymptomList displayList={displayList} />

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
