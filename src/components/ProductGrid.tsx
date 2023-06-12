import { type } from 'os';
import * as React from 'react';
import {ProductCard} from './ProductCard';
import { useState, useEffect, FC } from 'react';

interface ProductInfo{
  id: number,
  name: string,
  price: number,
  soldCount: number,
  imageURL: string, 
}

interface Props {
  products: ProductInfo[];
}
export const ProductGrid:FC<Props>=({ 
  products,
})=>{
  return(
    <div className='flex flex-row overflow-x-auto'>
        {products.map((value, index) => {
          return (
            <div key= {value.id}>
              <ProductCard 
                handleClick ={()=>{}} 
                name={value.name} 
                itemSold = {value.soldCount} 
                price = {value.price}
                imageSrc = {value.imageURL}
                id = {value.id} />
            </div>
          );
        })}
    </div>
  );
}