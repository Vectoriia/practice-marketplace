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
    <>
      <Card sx={{ maxWidth: "250px", maxHeight: "360px", position:"relative"}} style={{ borderRadius:"20px", boxShadow: "0px 4px 19px 0px rgba(0, 0, 0, 0.06)" }}>
        <CardActionArea onClick={()=>handleCardClick(product.id.toString())}>
          <CardMedia
            component="img"
            height="140"
            image={product.imageURL}
            alt={product.name}
          />
        </CardActionArea>
        <div className='flex' onClick={()=>handleCardClick(product.id.toString())}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" sx={{fontSize:'14px',  fontFamily: "Almarai",fontWeight: "700"}}>
              {product.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{fontSize:'12px',  fontFamily: "Almarai", color: "#A8ACB8"}}>
              {product.soldCount} {' '} sold
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{fontSize:'18px',  fontFamily: "Almarai",fontWeight: "700", color: "#3BBEB6"}}>
              ${product.price}
            </Typography>
          </CardContent>
        </div>
        <IconButton aria-label="play/pause" sx={{pointerEvents:'painted', padding: "0px", position:"absolute", height: "38px", width:"38px", bottom: "15px", right:"12px"}} onClick={handleCartChange}>
          {isInCart?
            <CheckCircleIcon sx={{ height: 38, width: 38, color:"black" }} />
            :<AddCircleIcon sx={{ height: 38, width: 38, color:"black" }} />}
        </IconButton>
      </Card>
    </>
  );
}
