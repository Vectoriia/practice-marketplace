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
    <Card sx={{ maxWidth: 345, color: props.isActive?"#37AFA8":"black" }}>
      <CardActionArea onClick={props.handleClick}>
        <CardMedia
          component="img"
          height="140"
          image={props.imageSrc}
          alt={props.text}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.text}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    );
}