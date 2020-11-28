import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { saveProfile } from '../functions/apiCalls';

const useStyles = makeStyles((theme) => ({
  formRoot: {
    '& > *': {
      margin: theme.spacing(1),
      width: '30ch',
    },
  },
  buttonDiv: {
    width: '100%',
    textAlign: 'right',
    paddingRight: 10,
    paddingTop: 20,
  },
}));

export default function FormSubmitGoals(props) {
  const classes = useStyles();
  const [input, setInput] = useState(() => {
    let { weight_goal, daily_calorie_goal } = props.profile;
    return {
      weight_goal,
      daily_calorie_goal,
    };
  });

  const handleInputChange = (e) =>
    setInput({
      ...input,
      [e.currentTarget.id]: e.currentTarget.value,
    });

  function submitSaveProfile(event) {
    event.preventDefault();
    let obj = { ...input };
    saveProfile(props.token, obj);
  }
  return (
    <form
      onSubmit={submitSaveProfile}
      className={classes.formRoot}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="weight_goal"
        label="Weight Goal"
        value={input.weight_goal}
        type="number"
        step="1"
        onChange={handleInputChange}
      />
      <TextField
        id="daily_calorie_goal"
        label="Daily Calorie Goal"
        value={input.daily_calorie_goal}
        type="number"
        step="10"
        onChange={handleInputChange}
      />
      <div className={classes.buttonDiv}>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
}
