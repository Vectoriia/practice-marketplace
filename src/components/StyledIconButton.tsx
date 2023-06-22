import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import { FC } from "react";
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
const StyledIconButton: FC<Props> = ({
   handleClick,
   text,
   type,
   className
 }) => (
    <div className=''>
      <ColorButton 
        sx={{height: "54px", width: "280px"}}
        variant="contained" 
        onClick={handleClick}
        type = {type}
        disableElevation={true}
        className = {className}
        >
          <div className='w-full flex items-center justify-center text-sm'>
            {text}
            <img className="w-[38px] h-[38px] absolute right-2"  src={ArrowIcon} alt="arrowIcon" onClick={handleClick}/>
          </div>
      </ColorButton>
    </div>
);

export default StyledIconButton;