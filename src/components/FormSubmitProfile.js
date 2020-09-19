import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

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
    saveProfile(props.id, props.token, obj);
  }
  return (
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
      <br />
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

async function saveProfile(id, token, body) {
  await fetch(`${process.env.REACT_APP_API}/api/users/edit`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      authorization: 'Token ' + token,
      id: id,
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
