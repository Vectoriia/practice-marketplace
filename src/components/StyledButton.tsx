import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import { FC } from "react";
const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  borderRadius: '40px',
  backgroundColor: '#3BBEB6',
  '&:hover': {
    backgroundColor: '#2C8680',
  },
}));
interface Props {
  handleClick(): void;
  text: string;
  type?: "button" | "submit" | "reset";
}
export const StyledButton: FC<Props> = ({
   handleClick, // { name, value, onChange, onBlur }
   text,
   type,
   ...props
 }) => (
    <ColorButton 
      variant="contained" 
      onClick={handleClick}
      type = {type}
      disableElevation={true}>
        {text}
    </ColorButton>
);
