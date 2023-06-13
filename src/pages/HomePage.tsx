import React, { ChangeEvent } from 'react';
import { useState, useEffect } from 'react';
import {Header} from '../components/Header';
import ImageCarousell from '../components/Carousel';
import {CategoryScroll} from '../components/CategoryScroll';
import ProductGrid from '../components/ProductGrid';
import {StyledIconButton} from '../components/StyledIconButton'
interface ProductInfo{
  id: number,
  name: string,
  price: number,
  soldCount: number,
  imageURL: string, 
}

export default function HomePage(){
  const [Search, setSearch] = useState('');
  const [CategoryId, setCategoryId] = useState(40);
  const [PageNumber, setPageNumber] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [products, setProducts] = useState<ProductInfo[]>([]);
  let PageSize: number = 10;

  const [Cart, setCart] = useState<ProductInfo[]>([]);

  function handleCategoryChange(id:number){
    setCategoryId(id);
  }
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }
  const handlePageNumberChange = (page:number) => {
    setPageNumber(page);
  }
  function handleCartChange(currentCart:ProductInfo[]){
    setCart(currentCart);
  }
  function cartDelete(id: number){
    const index = Cart.findIndex(element => element.id == id);
    if (index >= 0) {

      let tmpCart = [...Cart];
      tmpCart.splice(index, 1);

      setCart(tmpCart);
    }
    
    console.log("delete "+id);
  }
  function cartAdd(id: number){
    const tempObj = products.find(element => element.id == id);
    if (tempObj != undefined) {
      setCart([...Cart, tempObj])
    }
    console.log("add "+id);
  }
  useEffect(() => {
    setPageNumber(1);
    const api = async () => {
      const data = await fetch(`https://linkup-academy.herokuapp.com/api/v1/products?Search=${Search}&CategoryId=${CategoryId}&PageNumber=${PageNumber}&PageSize=${PageSize}`, {
        method: "GET"
      });
      const jsonData = await data.json();
      setProducts(jsonData.items);
      setHasNextPage(jsonData.hasNextPage);
      
    };
    api();
  }, [Search, CategoryId]);

  useEffect(() => {
    const api = async () => {
      const data = await fetch(`https://linkup-academy.herokuapp.com/api/v1/products?Search=${Search}&CategoryId=${CategoryId}&PageNumber=${PageNumber}&PageSize=${PageSize}`, {
        method: "GET"
      });
      const jsonData = await data.json();
      if(PageNumber>1){
        setProducts(products.concat(jsonData.items));
      }
      setHasNextPage(jsonData.hasNextPage);
    };
    api();
  }, [PageNumber]);

  console.log(Cart);

  return(
    <>
      <Header handleChange={handleSearchChange} cartAmount={Cart.length}/>
      <ImageCarousell/>
      <h1>Categories</h1>
      <CategoryScroll handleClick={handleCategoryChange}/>
      <h1>All products</h1>
      <ProductGrid products={products} cart = {Cart} handleCartChange={handleCartChange} cartAdd={cartAdd} cartDelete = {cartDelete}/>
      {(hasNextPage)?<StyledIconButton type='button' handleClick={()=>{handlePageNumberChange(PageNumber+1)}} text={"View more products"}/>:null}
    </>
  );
}