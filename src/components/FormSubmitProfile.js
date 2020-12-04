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

export default function FormSubmitProfile(props) {
  const classes = useStyles();
  const [input, setInput] = useState(() => {
    let {
      first_name,
      family_name,
      email,
      weight,
      weight_goal,
      daily_calorie_goal,
    } = props.profile;
    return {
      first_name,
      family_name,
      email,
      weight,
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
    obj.weight = Number(input.weight).toFixed(1);
    saveProfile(props.token, obj);
  }
  return (
    <div>
      <form
        onSubmit={submitSaveProfile}
        className={classes.formRoot}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="first_name"
          label="First Name"
          value={input.first_name}
          onChange={handleInputChange}
        />
        <TextField
          id="family_name"
          label="Last Name"
          value={input.family_name}
          onChange={handleInputChange}
        />
        <br />
        <TextField
          id="email"
          label="Email"
          value={input.email}
          onChange={handleInputChange}
        />
        <br />
        <TextField
          id="weight"
          label="Weight"
          value={input.weight}
          type="number"
          step="0.1"
          onChange={handleInputChange}
        />
        <div className={classes.buttonDiv}>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
