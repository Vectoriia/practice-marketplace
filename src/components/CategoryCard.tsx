import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { FC } from "react";
interface Props {
  handleClick(): void;
  text: string;
  imageSrc: string;
  isActive: boolean;
}
export default function CategoryCard (props:Props){
  return(
    <Card className="min-w-[152px]" sx={{ width: 132, color: props.isActive?"#37AFA8":"black" }} style={{ border: "none", boxShadow: "none" }}>
      <CardActionArea onClick={props.handleClick}>
        <CardMedia
          component="img"
          image={props.imageSrc}
          alt={props.text}
        />
        <CardContent>
          <Typography gutterBottom component="div" sx={{fontFamily:"Amari", fontWeight: "400", fontSize: "14px", lineHeight: "16px", fontStyle: "normal"}}>
            {props.text}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    );
}