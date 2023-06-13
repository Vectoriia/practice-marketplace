import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import cross from "../images/Vector.png";
import { ImageButton } from '../components/ImageButton';
import {StyledButton} from '../components/StyledButton';
import { FC } from "react";
import { CartItemInfo } from '../pages/HomePage';
import {CartCard} from '../components/CartCard';
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
  isOpen: boolean;
  cart: CartItemInfo[];
  cartItemCountModify(id: number, operator: number):void;
  cartDelete(id:number): void;
  cartPrice: number;
}

export const CartModal: FC<Props> = ({
    handleCartClose,
    isOpen,
    cart,
    cartItemCountModify,
    cartDelete,
    cartPrice,
  })=> {

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
                    <div key= {value.product.id}>
                      <CartCard 
                        cartItemCountModify = {cartItemCountModify} 
                        item = {value} 
                        cartDelete = {cartDelete}/>
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
            <StyledButton text='Checkout' type = "button" handleClick={()=>{}} className='md:h-[54px]'/>
          </Box>
          <ImageButton handleClick={()=>{
            handleCartClose();
          }} alt='cross' src={cross} className='absolute top-[40px] right-[40px] h-[12px] w-[12px]'/>
        </Box>
      </Modal>
    </div>
  );
}