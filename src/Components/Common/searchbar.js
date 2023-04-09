import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function InputSearch(props) {

  const onChange = (event, values) => {
    props.onChange(values);
  }

  const handleAutocompleteTextChange = (event) => {
    if (event.target.value && event.target.value.length > 5) {
      props.onInputChange(event.target.value);
    }
  }

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={props.input}
      onChange={onChange}
      onInputChange={props.onInputChange}
      getOptionLabel={option => option.name}
      disableCloseOnSelect={true}
      sx={{ width: 300 }}
      renderInput={params => <TextField {...params} label={props.label} variant="outlined" onChange={handleAutocompleteTextChange} />}
    />
  );
}

