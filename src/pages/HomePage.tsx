import React, { ChangeEvent } from 'react';
import { useState, useEffect } from 'react';
import {Header} from '../components/Header';
import ImageCarousell from '../components/Carousel';
import {CategoryScroll} from '../components/CategoryScroll';
import ProductGrid from '../components/ProductGrid';
import {StyledIconButton} from '../components/StyledIconButton';
import {CartModal} from '../modals/CartModal'
export interface ProductInfo{
  id: number,
  name: string,
  price: number,
  soldCount: number,
  imageURL: string, 
}
export interface CartItemInfo{
  product: ProductInfo,
  count: number,
}

export default function HomePage(){
  const [Search, setSearch] = useState('');
  const [CategoryId, setCategoryId] = useState(40);
  const [PageNumber, setPageNumber] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [products, setProducts] = useState<ProductInfo[]>([]);
  let PageSize: number = 10;

  const [cart, setCart] = useState<CartItemInfo[]>([]);
  const [cartPrice, setCartPrice] = useState(0);
  const [openCart, setOpenCart] = useState(false);
  function handleCategoryChange(id:number){
    setCategoryId(id);
  }
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }
  const handlePageNumberChange = (page:number) => {
    setPageNumber(page);
  }
  function cartDelete(id: number){
    const index = cart.findIndex(element => element.product.id == id);
    if (index >= 0) {

      let tmpCart = [...cart];
      tmpCart.splice(index, 1);

      setCart(tmpCart);
    }
  }
  function cartAdd(id: number){
    const tempObj =  products.find(element => element.id == id);
    if (tempObj != undefined) {
      setCart([...cart, {product: tempObj, count:1}])
    }
  }
  function cartItemCountModify(id: number, operator: number){
    const index = cart.findIndex(element => element.product.id == id);
    if (index >= 0) {
      let tmpCart = [...cart];
      if(tmpCart[index].count + operator == 0){
        cartDelete(id)
      }else{
        tmpCart[index].count = tmpCart[index].count + operator;
        setCart(tmpCart);
      }
    }
  }
  const handleCartOpen = () => {
    setOpenCart(true);
  };
  const handleCartClose = () => {
    setOpenCart(false);
  };
  function countCartPrice(){
    let sum = 0;
    cart.forEach(element => {
      sum += element.product.price * element.count;
    });
    setCartPrice(sum);
  }
  useEffect(()=>{
    countCartPrice();
  },[cart]);
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

  console.log(cart);

  return(
    <>
      <Header handleSearchChange={handleSearchChange} cartAmount={cart.length} handleCartOpen={handleCartOpen}/>
      <ImageCarousell/>
      <h1>Categories</h1>
      <CategoryScroll handleClick={handleCategoryChange}/>
      <h1>All products</h1>
      <ProductGrid products={products} cart = {cart} cartAdd={cartAdd} cartDelete = {cartDelete}/>
      {(hasNextPage)?<StyledIconButton type='button' handleClick={()=>{handlePageNumberChange(PageNumber+1)}} text={"View more products"}/>:null}
      <CartModal handleCartClose={handleCartClose} isOpen = {openCart} cart={cart} cartItemCountModify={cartItemCountModify} cartDelete={cartDelete} cartPrice={cartPrice}/>
    </>
  );
}