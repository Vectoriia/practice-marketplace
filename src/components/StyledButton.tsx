import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import { FC } from "react";
const ColorButtonGreen = styled(Button)<ButtonProps>(({ ...props }) => ({
  borderRadius: '40px',
  backgroundColor: '#37AFA8',
  fontFamily: 'Almarai',
  fontWeight: "400",
  fontSize: "14px",
  '&:hover': {
    backgroundColor: '#3BBEB6',
  },
  textTransform: 'none',
  root: {
    className: props.className,
  },
}));
const ColorButtonWhite = styled(Button)<ButtonProps>(({ ...props }) => ({
  borderRadius: '40px',
  backgroundColor: 'white',
  fontFamily: 'Almarai',
  fontWeight: "400",
  fontSize: "14px",
  '&:hover': {
    backgroundColor: '#D9D9D9',
  },
  color: 'black',
  border: '1px solid #D9D9D9',
  textTransform: 'none',
  root: {
    className: props.className,
  },
}));
const ColorButtonOutlined = styled(Button)<ButtonProps>(({ ...props }) => ({
  borderRadius: '40px',
  backgroundColor: 'white',
  fontFamily: 'Almarai',
  fontWeight: "400",
  fontSize: "14px",
  '&:hover': {
    backgroundColor: '#D9D9D9',
  },
  color: '#3BBEB6',
  border: '1px solid #3BBEB6',
  textTransform: 'none',
  root: {
    className: props.className,
  },
}));
interface Props {
  handleClick(): void;
  text: string;
  type?: "button" | "submit" | "reset";
  styleType?: "green" | "white" | "outlined";
  className?: string;
  marginTop?: string;
}
export const StyledButton: FC<Props> = ({
   handleClick,
   text,
   type,
   className,
   styleType,
   marginTop,
   ...props
 }) => {
    if(styleType === "outlined"){
      return(
        <ColorButtonOutlined 
          variant="contained" 
          onClick={handleClick}
          type = {type}
          disableElevation={true}
          className = {className}
          sx={{marginTop: {marginTop}, width: {xs:'100px', md:'120px'}}}>
            {text}
        </ColorButtonOutlined>
      );
    }else if(styleType === "white"){
      return(
        <ColorButtonWhite 
          variant="contained" 
          onClick={handleClick}
          type = {type}
          disableElevation={true}
          className = {className}
          sx={{marginTop: {marginTop}, width: {xs:'100px', md:'120px'}}}
        >
            {text}
        </ColorButtonWhite>
      );
    }else{
      return(
        <ColorButtonGreen 
          variant="contained" 
          onClick={handleClick}
          type = {type}
          disableElevation={true}
          className = {className}
          sx={{marginTop: {marginTop}, width: {xs:'100px', md:'120px'}}}
        >
            {text}
        </ColorButtonGreen>
      );
  }
};
