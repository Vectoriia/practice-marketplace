import * as React from 'react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import { ImageButton } from '../components/ImageButton';
import cross from "../images/Vector.png";
import { CartItemInfo } from '../pages/HomePage';
import { FC } from 'react';
interface Props {
  cartItemCountModify(id: number, operator: number):void;
  item: CartItemInfo;
  cartDelete(id:number): void;
}
export const CartCard: FC<Props> = ({
    cartItemCountModify,
    item,
    cartDelete,
  })=>
{
  let product = item.product;
  return(
    <div className = "relative">
      <div className='w-[480px] h-[116px] flex flex-row'>
        <img src = {product.imageURL}/>
        <div>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ${product.price}
          </Typography>
        </div>
        <div className='flex flex-row'>
          <IconButton aria-label="minus" onClick={()=>cartItemCountModify(product.id,-1)}>
            <RemoveRoundedIcon sx={{ height: 33, width: 33, color:"black", backgroundColor: "#F6F7F8",borderRadius: "44px" }} />
          </IconButton>
          <div>{item.count}</div>
          <IconButton aria-label="plus" onClick={()=>cartItemCountModify(product.id, 1)}>
            <AddCircleIcon sx={{ height: 33, width: 33, color:"black" }} />
          </IconButton>
        </div>
      </div>
      <ImageButton handleClick={()=>{
              cartDelete(product.id);
            }} alt='cross' src={cross} className='absolute top-[20px] right-[20px] h-[7px] w-[7px] opacity-50'/>
    </div>
    
  );
}