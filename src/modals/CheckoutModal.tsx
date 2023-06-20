import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import cross from "../images/Vector.png";
import check from "../images/check.png";
import { ImageButton } from '../components/ImageButton';
import { FC } from "react";
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { clearCart, getCartTotalPrice, selectCart } from '../redux/slices/cartSlice';
const mainBoxStyle = {
  position: 'absolute',
  alignItems: 'center',
  top: 0,
  right:0,
  width: {lg:'35%', md:'60%', xs:'100%'},
  height: '100%',
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
};
const bottomBoxStyle = {
  borderRadius: "10px", 
  boxShadow:'0px ',
  backgroundColor:'rgba(168, 172, 184, 0.1)',
  height:'66px', 
  width: 'full',
};
interface Props {
  handleCheckoutClose():void;
  isOpen: boolean;
}

export const CheckoutModal: FC<Props> = ({
    handleCheckoutClose,
    isOpen,
  })=> {
  const cart = useAppSelector(selectCart);
  const cartPrice = useAppSelector(getCartTotalPrice);
  const dispatch = useAppDispatch();
  return (
    <div>
      <Modal
        open = {isOpen}
        onClose={handleCheckoutClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={mainBoxStyle}>
          <div className='flex flex-col justify-center items-center h-full space-y-20'>
            <div  className='flex flex-col items-center'>
              <img className = "h-[132px] w-[132px]" src ={check} />
              <div className='p-4 flex-col'>
                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{fontFamily: 'Almarai',fontStyle:"normal", fontWeight: "700", fontSize: "32px"}}>
                  Congratulations!
                </Typography>
                <Typography id="modal-modal-description"  sx={{ mt: 2, fontFamily: 'Almarai',fontStyle:"normal", fontWeight: "400", fontSize: "14px", textAlign: "center", display: "flex", flexDirection:'column' }} component="span">
                  Your order has successfully placed<br/> and started processing.
                </Typography>
              </div>
            </div>
            <Box className="w-[308px]" sx={bottomBoxStyle}>
              <div className="w-full h-full flex flex-row w-full justify-center items-center justify-between px-[20px]">
                <Typography  component="div" sx={{fontFamily: 'Almarai',fontStyle:"normal", fontWeight: "400", fontSize: "14px",}}>
                  TOTAL
                </Typography>
                <Typography  sx={{color:"#3BBEB6", fontFamily: 'Almarai',fontStyle:"normal", fontWeight: "400", fontSize: "32px",}}>
                  ${cartPrice}
                </Typography>
              </div>
            </Box>
          </div>
          <ImageButton handleClick={()=>{
            console.log(cart)
            dispatch(clearCart());
            console.log(cart)
            handleCheckoutClose();
          }} alt='cross' src={cross} className='absolute top-[4%] right-[8%] h-[12px] w-[12px]'/>
        </Box>
      </Modal>
    </div>
  );
}