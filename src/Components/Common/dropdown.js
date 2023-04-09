import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectDropdown(props) {
  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
    props.onChange(event.target.value);
  };

  return (
    <Box sx={{ width: 302 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={props.label}
          onChange={handleChange}
        >
         {props.value.map((value, i) => {
             return (
              <MenuItem key={i} value={value.label}>{value.label}</MenuItem>
             )
         })}
            
          
            
          
          
          {/* <MenuItem value={0}>10</MenuItem> */}
        </Select>
      </FormControl>
    </Box>
  );
}
