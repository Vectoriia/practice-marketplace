import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import { FC } from "react";
const ColorButton = styled(Button)<ButtonProps>(({ ...props }) => ({
  borderRadius: '40px',
  backgroundColor: '#37AFA8',
  '&:hover': {
    backgroundColor: '#3BBEB6',
  },
  textTransform: 'none',
  root: {
    className: props.className,
  },
}));
interface Props {
  handleClick(): void;
  text: string;
  type?: "button" | "submit" | "reset";
  className?: string;
  marginTop?: string;
}
export const StyledButton: FC<Props> = ({
   handleClick,
   text,
   type,
   className,
   marginTop,
   ...props
 }) => (
    <ColorButton 
      variant="contained" 
      onClick={handleClick}
      type = {type}
      disableElevation={true}
      className = {className}
      sx={{marginTop: {marginTop}}}
    >
        {text}
    </ColorButton>
);
