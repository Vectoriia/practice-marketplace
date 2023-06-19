import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { CardActionArea, CardActions  } from '@mui/material';
import { ProductInfo } from '../pages/HomePage';
import { FC } from 'react';

interface Props {
  handleCardClick(id:string): void;
  product: ProductInfo;
  isInCart: boolean;
  cartAdd(id:number): void;
  cartDelete(id:number): void;
}
export const ProductCard: FC<Props> = ({
    handleCardClick,
    product,
    isInCart,
    cartAdd,
    cartDelete,
  })=>
{
  function handleCartChange(){
    if(isInCart){
      cartDelete(product.id);
    }else{
      cartAdd(product.id);
    }
  }
  return(
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={()=>handleCardClick(product.id.toString())}>
        <CardMedia
          component="img"
          height="140"
          image={product.imageURL}
          alt={product.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.soldCount} {' '} sold
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ${product.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <IconButton aria-label="play/pause" onClick={handleCartChange}>
          {isInCart?
            <CheckCircleIcon sx={{ height: 38, width: 38, color:"black" }} />
            :<AddCircleIcon sx={{ height: 38, width: 38, color:"black" }} />}
        </IconButton>
      </CardActions>
    </Card>
  );
}
