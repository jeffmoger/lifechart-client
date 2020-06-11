import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export default function SwitchLabels(props) {
  const handleChange = (event) => {
    props.onSwitchChange({[event.target.name]: event.target.checked });
  };

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Switch
            checked={props.googleSwitch}
            onChange={handleChange}
            name={props.name}
            color={props.color}
          />
        }
        label={props.label}
      />
    </FormGroup>
  );
}