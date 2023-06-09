import { TextField } from '@mui/material';

import React, { FC } from "react";
import { ChangeEventHandler } from 'react';

interface Props {
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  value: string;
  type: string;
  className?: string;
}

export const StyledTextField: FC<Props> = ({
   onChange, 
   placeholder,
   value,
   type,
   className,
   ...props
 }) => (
     <TextField
          id="outlined-multiline-flexible"
          placeholder= {placeholder}
          value={value}
          onChange={onChange}
          type={type}
          InputProps={{ 
            sx: {
              borderRadius: '40px', 
              backgroundColor: '#A8ACB81A', 
              borderColor: '#A8ACB81A',
              border: 'none',
              'fieldset': {
                border: 'none',
              },
              '&:hover fieldset': {
                border: 'none',
              },
            },
            className: className,
          }}
        />
 );