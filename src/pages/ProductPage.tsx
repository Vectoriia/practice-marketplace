import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../components/Header";
import { CartModal } from "../modals/CartModal";
import { CheckoutModal } from "../modals/CheckoutModal";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addItemToCart, deleteItemFromCart, editItemCount, selectCart } from "../redux/slices/cartSlice";
import { StyledButton } from "../components/StyledButton";
import Typography from '@mui/material/Typography';
import imageURL from "../images/tempSrc/imageURL.png";
import detailsPictureURLPrimary from "../images/tempSrc/detailsPictureURLPrimary.png";
import detailsPictureURLSecondary1 from "../images/tempSrc/detailsPictureURLSecondary1.png";
import detailsPictureURLSecondary2 from "../images/tempSrc/detailsPictureURLSecondary2.png";

interface FullProductInfo{
  id: number,
  name: string,
  price: number,
  description: string,
  soldCount: number,
  imageURL: string, 
  detailsPictureURLPrimary: string,
  detailsPictureURLSecondary: string[],
  detailsTextPrimary: string,
  detailsTextSecondary: string,
}
const detailsPictureURLSecondary = [
  {
    src: detailsPictureURLSecondary1,
    alt: 'First image',
  },
  {
    src: detailsPictureURLSecondary2,
    alt: 'Second image',
  },
];
const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<FullProductInfo>({
    id: 0,
    name: '',
    price: 0,
    description: '',
    soldCount: 0,
    imageURL: '', 
    detailsPictureURLPrimary: '',
    detailsPictureURLSecondary: [],
    detailsTextPrimary: '',
    detailsTextSecondary: '',});
  const cart = useAppSelector(selectCart);
  const dispatch = useAppDispatch();

  const [openCart, setOpenCart] = useState(false);
  const [openCheckout, setOpenCheckout] = useState(false);
  const isInCart = useMemo(()=>cart.findIndex(p => p.id == product.id) >= 0,[cart, product]);
  useEffect(()=>{
    const api = async () => {
      const data = await fetch(`https://linkup-academy.herokuapp.com/api/v1/products/${id}`, {
        method: "GET"
      });
      const jsonData = await data.json();
      setProduct(jsonData);
    };
    api();
    window.scrollTo(0,0);
  }, []);

  return (
    <div className = "mt-16">
      <Header handleSearchChange={()=>{}} handleCartOpen={()=>setOpenCart(true)}/>
      <div className="flex flex-row">
        <img className="w-[529px] h-[441px]"src={imageURL}/>
        <div>
          <Typography variant="h4">
              {product.name}
          </Typography>
          <p>{product.soldCount}{" "}sold</p>
          <p>{/*product?.description*/}Finish every look on a note of Parisian chic with the 
            Lou Camera crossbody bag from Saint Laurent, presented here in cream beige. Made 
            in Italy from chevron matelassé leather, the design is adorned with golden hardware.</p>
          <hr></hr>
          <div>
            <Typography variant="h4">
              ${product.price}
            </Typography>
            <StyledButton text={isInCart?"Added to Cart":"Add to Cart"} type = "button" 
              styleType="outlined"
              handleClick={()=>{
                if (isInCart){
                  dispatch(deleteItemFromCart(product.id));
                }else{
                  dispatch(addItemToCart({
                    id: product.id, 
                    name: product.name, 
                    price: product.price, 
                    soldCount: product.soldCount,
                    imageURL: product.imageURL, 
                    amount: 1
                  }));
                }
            }} />
          </div>
        </div>
      </div>
      <hr></hr>
      <div>
        <Typography variant="h5">
          Extra information
        </Typography> 
        <img className="w-[1360px] h-[560px]"src={detailsPictureURLPrimary}/>
        <Typography variant="h6">
          Take a look at a new style!
        </Typography> 
        <p>No matter where you're heading, the Uptown wallet on chain from Saint Laurent will lend Parisian glamour to your looks. 
          The slimline design comes in moss green leather embossed with a croc-effect,<br/> and its envelope silhouette is completed with 
          a gold-toned iteration of the brand's iconic YSL monogram plaque.</p>
        <p>Suited for day-to-night styles, the Uptown clutch from Saint Laurent will lend any look a touch of Parisian glamour.</p>
        <p>It's crafted in Italy from black leather and works an envelope silhouette with the monogram logo in glossy golden hardware. 
          Carry yours in-hand or swing it from the adjustable shoulder strap.</p>
        <div className="flex flex-row">
          {detailsPictureURLSecondary.map((value, index) => {
              return (
                <div key= {index}>
                  <img src={value.src} alt={value.alt}/>
                </div>
              );
            })
          }
        </div>
        <p>No matter where you're heading, the Uptown wallet on chain from Saint Laurent will lend Parisian glamour to your looks. 
        The slimline design comes in moss green leather embossed with a croc-effect,<br/> and its envelope silhouette is completed with 
        a gold-toned iteration of the brand's iconic YSL monogram plaque.</p>
        <p>Suited for day-to-night styles, the Uptown clutch from Saint Laurent will lend any look a touch of Parisian glamour.</p>
        <p>It's crafted in Italy from black leather and works an envelope silhouette with the monogram logo in glossy golden hardware. 
          Carry yours in-hand or swing it from the adjustable shoulder strap.</p>
      </div>
      <CartModal handleCartClose={()=>setOpenCart(false)} handleCheckoutOpen={()=>setOpenCheckout(true)} isOpen = {openCart} cartItemCountModify={(id:number, operator: number)=>dispatch(editItemCount({id, operator}))} cartDelete={(id:number)=>dispatch(deleteItemFromCart(id))}/>
      <CheckoutModal handleCheckoutClose={()=>setOpenCheckout(false)} isOpen = {openCheckout}/>
    </div>
  );
};

export default ProductPage;