import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import CartModal from "../modals/CartModal";
import CheckoutModal from "../modals/CheckoutModal";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addItemToCart, deleteItemFromCart, editItemCount, selectCart } from "../redux/slices/cartSlice";
import StyledButton from "../components/StyledButton";
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
  const navigate = useNavigate();
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
    <div className = "w-full h-full flex flex-col items-center">
      <Header handleSearchChange={()=>{}} handleCartOpen={()=>setOpenCart(true)}/>
      <div className="max-w-[1015px] mt-20 flex flex-col items-center justify-center pt-[20px]">
        <div className="flex flex-row">
          <div onClick={()=>{
          navigate(-1);}} className='absolute top-[75px] h-[13px] w-[50px] z-20 text-[12px] font-Almarai text-neutral-500'>
            ← BACK
          </div>
          <img className=" max-w-[529px] max-h-[441px]"src={imageURL}/>
          <div className="flex flex-col h-full justify-around  pl-[54px]">
            <div className="flex flex-col space-y-[30px]  ">
              <Typography variant="h4" sx={{fontSize:'32px',  fontFamily: "Almarai",fontWeight: "700"}}>
                  {product.name}
              </Typography>
              <p className="text-[14px] font-Almari text-[#A8ACB8]">{product.soldCount}{" "}sold</p>
              <p className="text-[14px] font-Almarai text-breaks">
                {/*product?.description*/}
                Finish every look on a note of Parisian chic with the 
                Lou Camera crossbody bag from Saint Laurent, presented here in cream beige. Made 
                in Italy from chevron matelassé leather, the design is adorned with golden hardware.</p>
            </div>
            <hr></hr>
            <div className="flex justify-between">
              <Typography variant="h4" sx={{fontSize:'32px',  fontFamily: "Almarai",fontWeight: "700", color: "#3BBEB6"}}>
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
        <hr className="w-full my-[40px]"></hr>
        <div className="mb-[90px]">
          <Typography variant="h5" sx={{fontSize:'24px',  fontFamily: "Almarai",fontWeight: "700"}}>
            Extra information
          </Typography> 
          <img className="w-[1360px] h-[560px] my-[30px]"src={detailsPictureURLPrimary}/>
          <Typography variant="h6" sx={{fontSize:'18px',  fontFamily: "Almarai",fontWeight: "700"}}>
            Take a look at a new style!
          </Typography> 
          <p className="text-[16px] font-Almarai leaading-normal text-breaks">No matter where you're heading, the 
            Uptown wallet on chain from Saint Laurent will lend Parisian glamour to your looks. The slimline design
             comes in moss green leather embossed with a croc-effect, and its envelope silhouette is completed with 
            a gold-toned iteration of the brand's iconic YSL monogram plaque.<br/><br/>Suited for day-to-night styles, 
            the Uptown clutch from Saint Laurent will lend any look a touch of Parisian glamour.<br/><br/>It's crafted 
            in Italy from black leather and works an envelope silhouette with the monogram logo in glossy golden hardware. 
            Carry yours in-hand or swing it from the adjustable shoulder strap.</p>
          <div className="flex flex-row my-[30px] space-x-[22px]">
            {detailsPictureURLSecondary.map((value, index) => {
                return (
                  <div key= {index}>
                    <img src={value.src} alt={value.alt}/>
                  </div>
                );
              })
            }
          </div>
          <p className="text-[16px] font-Almarai leaading-normal text-breaks">No matter where you're heading, the Uptown 
            wallet on chain from Saint Laurent will lend Parisian glamour to your looks. The slimline design comes in moss
             green leather embossed with a croc-effect, and its envelope silhouette is completed with a gold-toned 
             iteration of the brand's iconic YSL monogram plaque.<br/><br/>Suited for day-to-night styles, 
             the Uptown clutch from Saint Laurent will lend any look a touch of Parisian glamour.<br/><br/>
            It's crafted in Italy from black leather and works an envelope silhouette with the monogram logo in 
            glossy golden hardware. Carry yours in-hand or swing it from the adjustable shoulder strap.</p>
        </div>
        <CartModal 
          handleCartClose={()=>setOpenCart(false)} 
          handleCheckoutOpen={()=>setOpenCheckout(true)} 
          isOpen = {openCart} 
          cartItemCountModify={(id:number, operator: number)=>dispatch(editItemCount({id, operator}))}/>
        <CheckoutModal 
          handleCheckoutClose={()=>setOpenCheckout(false)} 
          isOpen = {openCheckout}/>
      </div>
    </div>
  );
};

export default ProductPage;