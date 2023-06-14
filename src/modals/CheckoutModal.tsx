import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import cross from "../images/Vector.png";
import check from "../images/check.png";
import { ImageButton } from '../components/ImageButton';
import { FC } from "react";
const mainBoxStyle = {
  position: 'absolute',
  alignItems: 'center',
  top: 0,
  right:0,
  width: '560px',
  height: '100%',
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
};
const bottomBoxStyle = {
  borderRadius: "10px", 
  boxShadow:'0px 4px 24px rgba(0, 0, 0, 0.12)',
  height:'108px', 
  width: 'full',
};
interface Props {
  handleCheckoutClose():void;
  isOpen: boolean;
  cartPrice: number;
}

export const CheckoutModal: FC<Props> = ({
    handleCheckoutClose,
    isOpen,
    cartPrice,
  })=> {

  return (
    <div>
      <Modal
        open = {isOpen}
        onClose={handleCheckoutClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={mainBoxStyle}>
          <img className = "h-[132px] w-[132px]" src ={check} />
          <div className='p-4'>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Congratulations!
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }} component="span">
              Your order has successfully placed and started processing.
            </Typography>
          </div>
          <Box className="flex flex-row" sx={bottomBoxStyle}>
            <div>
              <Typography gutterBottom variant="h5" component="div">
                Total Price
              </Typography>
              <Typography variant="h5" sx={{color:"#3BBEB6"}}>
                ${cartPrice}
              </Typography>
            </div>
          </Box>
          <ImageButton handleClick={()=>{
            handleCheckoutClose();
          }} alt='cross' src={cross} className='absolute top-[40px] right-[40px] h-[12px] w-[12px]'/>
        </Box>
      </Modal>
    </div>
  );
}