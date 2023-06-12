import React, { ChangeEvent } from 'react';
import { useState, useEffect } from 'react';
import {Header} from '../components/Header';
import ImageCarousell from '../components/Carousel';
import {CategoryScroll} from '../components/CategoryScroll';
import {ProductGrid} from '../components/ProductGrid';
interface ProductInfo{
  id: number,
  name: string,
  price: number,
  soldCount: number,
  imageURL: string, 
}

export default function HomePage(){
  const [result, setResult] = useState([]);
  const [Search, setSearch] = useState('');
  const [CategoryId, setCategoryId] = useState(40);
  let PageSize: number = 10;
  const [products, setProducts] = useState([]);

  function handleCategoryChange(id:number){
    setCategoryId(id);
  }
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }

  useEffect(() => {
    const api = async () => {
      const data = await fetch(`https://linkup-academy.herokuapp.com/api/v1/products?Search=${Search}&CategoryId=${CategoryId}&PageNumber=1&PageSize=${PageSize}`, {
        method: "GET"
      });
      const jsonData = await data.json();
      setResult(jsonData);
      setProducts(jsonData.items)
      console.log(jsonData);
    };
    api();
  }, [Search, CategoryId ]);
  return(
    <>
      <Header handleChange={handleSearchChange}/>
      <ImageCarousell/>
      <h1>Categories</h1>
      <CategoryScroll handleClick={handleCategoryChange}/>
      <h1>All products</h1>
      <ProductGrid products={products} />
    </>
  );
}