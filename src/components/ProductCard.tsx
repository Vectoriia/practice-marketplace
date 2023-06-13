import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { CardActionArea, CardActions  } from '@mui/material';
import { useState } from 'react';
interface Props {
  handleCardClick(): void;
  name: string;
  itemSold: number;
  price: number;
  imageSrc: string;
  id: number;
  isInCart: boolean;
  cartAdd(id:number): void;
  cartDelete(id:number): void;
}
export default function ProductCard(props:Props)
{
  function handleCartChange(){
    if(props.isInCart){
      props.cartDelete(props.id);
    }else{
      props.cartAdd(props.id);
    }
  }
  return(
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={props.handleCardClick}>
        <CardMedia
          component="img"
          height="140"
          image={props.imageSrc}
          alt={props.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.itemSold} {' '} sold
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ${props.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <IconButton aria-label="play/pause" onClick={handleCartChange}>
          {props.isInCart?
            <CheckCircleIcon sx={{ height: 38, width: 38, color:"black" }} />
            :<AddCircleIcon sx={{ height: 38, width: 38, color:"black" }} />}
        </IconButton>
      </CardActions>
    </Card>
  );
}
