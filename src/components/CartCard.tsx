import * as React from 'react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import ImageButton from '../components/ImageButton';
import cross from '../images/Vector.png';
import { CartItemInfo } from '../pages/HomePage';
import { FC } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { deleteItemFromCart } from '../redux/slices/cartSlice';
import { Box } from '@mui/material';
interface Props {
  cartItemCountModify(id: number, operator: number): void;
  item: CartItemInfo;
}
const CartCard: FC<Props> = ({ cartItemCountModify, item }) => {
  const dispatch = useAppDispatch();
  return (
    <div className="relative mx-[40px]">
      <Box
        sx={{
          borderRadius: '20px',
          boxShadow: '0px 4px 19px 0px rgba(0, 0, 0, 0.06)',
          height: '116px',
          width: 'full',
        }}
      >
        <div className="w-[480px] h-[116px] flex flex-row justify-stretch">
          <img src={item.imageURL} className="p-[20px] " />
          <div className="flex flex-col justify-center ">
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{
                color: '#313131',
                fontSize: '14px',
                fontFamily: 'Almarai',
                fontWeight: '700',
              }}
            >
              {item.name}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#3BBEB6',
                fontSize: '14px',
                fontFamily: 'Almarai',
                fontWeight: '700',
              }}
            >
              ${item.price}
            </Typography>
          </div>
          <div className="flex flex-row items-end absolute bottom-[18px] right-[20px]">
            <IconButton
              aria-label="minus"
              onClick={() => cartItemCountModify(item.id, -1)}
            >
              <RemoveRoundedIcon
                sx={{
                  height: 33,
                  width: 33,
                  color: 'black',
                  backgroundColor: '#F6F7F8',
                  borderRadius: '44px',
                }}
              />
            </IconButton>
            <div className="pb-[11px] ">{item.amount}</div>
            <IconButton
              aria-label="plus"
              onClick={() => cartItemCountModify(item.id, 1)}
            >
              <AddCircleIcon sx={{ height: 33, width: 33, color: 'black' }} />
            </IconButton>
          </div>
        </div>
        <ImageButton
          handleClick={() => {
            dispatch(deleteItemFromCart(item.id));
          }}
          alt="cross"
          src={cross}
          className="absolute top-[20px] right-[20px] h-[7px] w-[7px] opacity-50"
        />
      </Box>
    </div>
  );
};
export default CartCard;
