import React, { ChangeEvent } from 'react';
import { useState, useEffect } from 'react';
import {Header} from '../components/Header';
import ImageCarousell from '../components/Carousel';
import {CategoryScroll} from '../components/CategoryScroll';
import ProductGrid from '../components/ProductGrid';
import {CartModal} from '../modals/CartModal';
import {CheckoutModal} from '../modals/CheckoutModal';
import { addItemToCart, deleteItemFromCart, editItemCount, getCartTotalPrice, selectCart } from '../redux/slices/cartSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { generatePath, useNavigate } from 'react-router-dom';
export interface ProductInfo{
  id: number,
  name: string,
  price: number,
  soldCount: number,
  imageURL: string, 
}
export interface CartItemInfo extends ProductInfo{
  amount: number,
}

export default function HomePage(){
  const [Search, setSearch] = useState('');
  const [CategoryId, setCategoryId] = useState(40);
  const [PageNumber, setPageNumber] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [products, setProducts] = useState<ProductInfo[]>([]);
  let PageSize: number = 10;
  const [openCart, setOpenCart] = useState(false);
  const [openCheckout, setOpenCheckout] = useState(false);
  const navigate = useNavigate();
  const cart = useAppSelector(selectCart);
  const dispatch = useAppDispatch();

  const handleProductRedirect = (id:string) => {
    id && navigate(generatePath("/product-page/:id", { id }));
  };
  function handleCategoryChange(id:number){
    setCategoryId(id);
  }
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }
  const handlePageNumberChange = () => {
    setPageNumber(PageNumber+1);
  }
  function cartDelete(id: number){
    dispatch(deleteItemFromCart(id));
  }
  function cartAdd(id: number){
    const tempObj =  products.find(element => element.id == id);
    if (tempObj != undefined) {
      dispatch(addItemToCart({
        id: tempObj.id, 
        name: tempObj.name, 
        price: tempObj.price, 
        soldCount: tempObj.soldCount,
        imageURL: tempObj.imageURL, 
        amount: 1
      }))
    }
  }
  function cartItemCountModify(id: number, operator: number){
    dispatch(editItemCount({id, operator}));
  }

  const handleCartOpen = () => {
    setOpenCart(true);
  };
  const handleCartClose = () => {
    setOpenCart(false);
  };
  const handleCheckoutOpen = () => {
    setOpenCheckout(true);
    handleCartClose();
  };
  const handleCheckoutClose = () => {
    setOpenCheckout(false);
  };
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

  return(
    <div className="w-full h-full flex flex-col items-center">
      <Header handleSearchChange={handleSearchChange} handleCartOpen={handleCartOpen}/>
      <div className = "max-w-[1015px] mt-20 flex flex-col items-center justify-center">
        <ImageCarousell/>
        <h1 className="w-full mt-[24px] mb-[14px] text-left font-almarai font-size-[24px] font-bold text-gray-700">Categories</h1>
        <CategoryScroll handleClick={handleCategoryChange}/>
        <h1 className="w-full my-[14px] text-left font-almarai font-size-[24px] font-bold  text-gray-700">All products</h1>
        <ProductGrid products={products} cartAdd={cartAdd} cartDelete = {cartDelete} handleProductRedirect={handleProductRedirect} hasNextPage={hasNextPage} handlePageNumberChange={handlePageNumberChange}/>
        <CartModal handleCartClose={handleCartClose} handleCheckoutOpen={handleCheckoutOpen} isOpen = {openCart} cartItemCountModify={cartItemCountModify}/>
        <CheckoutModal handleCheckoutClose={handleCheckoutClose} isOpen = {openCheckout}/>
      </div>
    </div>
  );
}