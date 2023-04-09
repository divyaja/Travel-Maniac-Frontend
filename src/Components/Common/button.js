import React from "react";
import Button from '@mui/material/Button';

function button(props) {
  return (
    <div>
      <Button
        variant="contained"
        onClick={props.onClick}
        disabled={props.disabled}
        value={props.value}
      >
        {props.btname}
      </Button>
    </div>
  );
}

export default button;
