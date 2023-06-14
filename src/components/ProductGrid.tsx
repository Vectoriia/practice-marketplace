import * as React from 'react';
import {ProductCard} from './ProductCard';
import { FC } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { ProductInfo, CartItemInfo } from '../pages/HomePage';

interface Props {
  products: ProductInfo[];
  cart: CartItemInfo[];
  cartAdd(id:number): void;
  cartDelete(id:number): void;
}
export default function ProductGrid(props:Props){ 

  return(
    <div className='flex flex-row overflow-x-auto'>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 12, md: 20 }}>
          {props.products.map((value, index) => {
            return (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <div key= {value.id}>
                  <ProductCard 
                    handleCardClick ={()=>{/*naviagete to product page*/}}
                    product = {value}
                    isInCart={props.cart.findIndex(p => p.product.id == value.id) >= 0} 
                    cartAdd={props.cartAdd} 
                    cartDelete = {props.cartDelete}/>
                </div>
              </Grid>
            );
          })}
        </Grid>
    </Box>
    </div>
  );
}