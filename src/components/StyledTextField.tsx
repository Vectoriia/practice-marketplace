import { TextField } from '@mui/material';

import React, { FC } from "react";
import { ChangeEventHandler } from 'react';

interface Props {
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  value: string;
  type: string;
}

export const StyledTextField: FC<Props> = ({
   onChange, // { name, value, onChange, onBlur }
   placeholder,
   value,
   type,
   ...props
 }) => (
     <TextField
          id="outlined-multiline-flexible"
          placeholder= {placeholder}
          value={value}
          onChange={onChange}
          fullWidth
          type={type}
          sx={{border: 'none'}}
          InputProps={{ sx: {
            borderRadius: '40px', 
            backgroundColor: '#A8ACB81A', 
            borderColor: '#A8ACB81A',
            'fieldset': {
              border: 'none',
            },
            '&:hover fieldset': {
              border: 'none',
            },
          }}}
        />
 );