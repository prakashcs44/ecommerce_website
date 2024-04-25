import React, { useState } from 'react'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FormControl,InputAdornment,InputLabel,OutlinedInput,IconButton} from "@mui/material";

function SensitiveInput({inputLabel,value,onChange}) {

  const [showInput,setShowInput] = useState(false);

  const handleClickShowInput = ()=>{
      setShowInput(val=>!val);
  }

  const handleMouseDownInput = (ev)=>{
     ev.preventDefault();
  }

  return (
    <FormControl variant="outlined" fullWidth>
    <InputLabel htmlFor="outlined-adornment-password">{inputLabel}</InputLabel>
    <OutlinedInput
      id="outlined-adornment-password"
      type={showInput ? 'text' : 'password'}
      value={value}
      onChange={onChange}
      fullWidth
      required
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowInput}
            onMouseDown={handleMouseDownInput}
            edge="end"
          >
            {showInput ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      }
      label={inputLabel}
    />
  </FormControl>
  )
}

export default SensitiveInput
