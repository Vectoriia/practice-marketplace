import * as React from 'react';
import {ProductCard} from './ProductCard';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { ProductInfo } from '../pages/HomePage';
import { useAppSelector } from '../redux/hooks';
import { selectCart } from '../redux/slices/cartSlice';
import productImg1 from "../images/tempSrc/productImg1.png";
import productImg2 from "../images/tempSrc/productImg2.png";
import productImg3 from "../images/tempSrc/productImg3.png";
import productImg4 from "../images/tempSrc/productImg4.png";
import productImg5 from "../images/tempSrc/productImg5.png";
import productImg6 from "../images/tempSrc/productImg6.png";
import productImg7 from "../images/tempSrc/productImg7.png";
import productImg8 from "../images/tempSrc/productImg8.png";
import productImg9 from "../images/tempSrc/productImg9.png";
import productImg10 from "../images/tempSrc/productImg10.png";
const imageURL = [
  productImg1, productImg2, 
  productImg3, productImg4, 
  productImg5, productImg6, 
  productImg7, productImg8, 
  productImg9, productImg10,
];
interface Props {
  products: ProductInfo[];
  cartAdd(id:number): void;
  cartDelete(id:number): void;
  handleProductRedirect(id:string):void;
}
export default function ProductGrid(props:Props){ 
  const cart = useAppSelector(selectCart);
  let imgIndex = 0;
  return(
    <div className='flex flex-row overflow-x-auto'>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 12, md: 20 }}>
          {props.products.map((value, index) => {
            value.imageURL = imageURL[imgIndex];
            (imgIndex === 9)?imgIndex = 0:imgIndex++;
            
            return (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <div key= {value.id}>
                  <ProductCard 
                    handleCardClick ={props.handleProductRedirect}
                    product = {value}
                    isInCart={cart.findIndex(p => p.id == value.id) >= 0} 
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