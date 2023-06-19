import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import cross from "../images/Vector.png";
import { ImageButton } from '../components/ImageButton';
import {StyledButton} from '../components/StyledButton';
import { FC, useMemo } from "react";
import { CartItemInfo } from '../pages/HomePage';
import {CartCard} from '../components/CartCard';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { clearCart, getCartTotalPrice, selectCart } from '../redux/slices/cartSlice';
import { getIsUserAuthorized, selectUser } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
const mainBoxStyle = {
  position: 'absolute',
  top: 0,
  right:0,
  width: '560px',
  height: '100%',
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
};
const bottomBoxStyle = {
  borderRadius: "50px 50px 0px 0px", 
  boxShadow:'0px 4px 24px rgba(0, 0, 0, 0.12)',
  height:'108px', 
  width: 'full',
};
interface Props {
  handleCartClose():void;
  handleCheckoutOpen():void;
  isOpen: boolean;
  cartItemCountModify(id: number, operator: number):void;
}
interface ArrayProps{
  quantity:number, 
  productId:number,
}
export const CartModal: FC<Props> = ({
    handleCartClose,
    handleCheckoutOpen,
    isOpen,
    cartItemCountModify,
  })=> {
  const cart = useAppSelector(selectCart);
  const cartPrice = useAppSelector(getCartTotalPrice);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const isUserAuthorised = useAppSelector(getIsUserAuthorized);
  const navigate = useNavigate();
  const handleSubmitOrder = async()=>{
    if(cartPrice<=0){
      window.alert("Cart is empty");
      return;
    }
    const paramArray: ArrayProps[] = []
    for(let i = 0; i< cart.length; i++){
      paramArray.push({quantity: cart[i].amount, productId:cart[i].id});
    }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' , 
                    'Authorization': `Bearer ${user.token}`, 
        },
        body:JSON.stringify({
         orderProducts: paramArray
        })
      };
      
      if(isUserAuthorised){
        await fetch('https://linkup-academy.herokuapp.com/api/v1/orders', requestOptions)
        .then(res => {
          console.log(res.status)
          if(res.status !== 200)
          {
            throw new Error("not slay");
          }else
          { 
            res.json()
            handleCheckoutOpen();
          }
        })
        .catch(err => {
          console.log(err);
          window.alert("Some error occurred.");
          navigate('/signin')
        });
      }else{
        window.alert("Please authorize first.");
        navigate('/signin')
      }
  }
  return (
    <div>
      <Modal
        open = {isOpen}
        onClose={handleCartClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={mainBoxStyle}>
          <div className='p-4'>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              My Cart
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }} component="span">
              <div className='flex flex-col space-y-[15px]'>
                {cart.map((value, index) => {
                  return (
                    <div key= {value.id}>
                      <CartCard 
                        cartItemCountModify = {cartItemCountModify} 
                        item = {value} />
                    </div>
                  );
                })}
              </div>
            </Typography>
          </div>
          <Box className="flex flex-row" sx={bottomBoxStyle}>
            <div>
              <Typography gutterBottom variant="h5" component="div">
                ${cartPrice}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Price
              </Typography>
            </div>
            <StyledButton text='Checkout' type = "button" handleClick={handleSubmitOrder} className='md:h-[54px]'/>
          </Box>
          <ImageButton handleClick={()=>{
            handleCartClose();
          }} alt='cross' src={cross} className='absolute top-[40px] right-[40px] h-[12px] w-[12px]'/>
        </Box>
      </Modal>
    </div>
  );
}