import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import { FC } from "react";
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import ArrowIcon from "../images/arrowButton.png"
const ColorButton = styled(Button)<ButtonProps>(({ ...props }) => ({
  borderRadius: '40px',
  backgroundColor: '#F6F7F8',
  color: 'black',
  '&:hover': {
    backgroundColor: '#F6F7F8',
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
}
export const StyledIconButton: FC<Props> = ({
   handleClick,
   text,
   type,
   className,
   ...props
 }) => (
    <div className='absolute '>
      <ColorButton 
        variant="contained" 
        onClick={handleClick}
        type = {type}
        disableElevation={true}
        className = {className}
        >
          {text}
      </ColorButton>
      <img className="" src={ArrowIcon} alt="arrowIcon" onClick={handleClick}/>
    </div>
);
