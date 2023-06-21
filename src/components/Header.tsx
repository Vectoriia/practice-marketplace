import * as React from "react";
  
import AppBar from "@mui/material/AppBar";
import Box from '@mui/material/Box';
import Toolbar from "@mui/material/Toolbar";
import {StyledButton} from '../components/StyledButton';
import IconButton from "@mui/material/IconButton";
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import { common } from '@mui/material/colors';
import Badge from '@mui/material/Badge';
import linkupLogo from "../images/logo.png";
import searchIcon from "../images/Search.png";
import cartIcon from "../images/Cart.png";
import { useNavigate } from 'react-router-dom';
import { ChangeEventHandler, FC, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectCart } from "../redux/slices/cartSlice";
import { clearUserData, getIsUserAuthorized, selectUser } from "../redux/slices/userSlice";
import userAvatar from "../images/tempSrc/UserAvatar.png"
import DensityMediumIcon from '@mui/icons-material/DensityMedium';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: "40px",
  color: theme.palette.common.black,
  backgroundColor: alpha(theme.palette.common.black, 0.08),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.05),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));
interface Props {
  handleSearchChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  handleCartOpen():void;
}
export const Header: FC<Props> = ({
    handleSearchChange,
    handleCartOpen,
  })=> {
  const cart = useAppSelector(selectCart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isUserAuthorised = useAppSelector(getIsUserAuthorized);
  return (
    <div className="sticky top-0 z-40 h-[68px]">
      <AppBar  sx={{backgroundColor:"white", }}>
        <Toolbar className="lg:mx-[277px] md:mx-[150px] sm:mx-[100px] flex flex-row  items-center justify-center space-x-20">
          <img className='w-[48px] h-[48px]' src={linkupLogo} onClick={()=>{navigate('/home-page');}}/>
          <Search sx={{ flexGrow: 1 }}>
            <SearchIconWrapper>
              <img className = "w-[15px] h-[15px]" src={searchIcon} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleSearchChange}
            />
          </Search>
          <div className="flex flex-row sm:space-x-4">
            <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
              <IconButton aria-label="show amount of goods" color="inherit" onClick={handleCartOpen} >
                <Badge badgeContent={cart.length} color="error"  anchorOrigin={{ vertical: 'top', horizontal: 'left', }}>
                  <img className='w-[24px] h-[24px]' src={cartIcon} />
                </Badge>
              </IconButton>
            </Box>
            {isUserAuthorised? 
              <div className = "flex flex-row border-[1px] border-solid border-gray-700 rounded-[50px] w-[73px] h-[42px] items-center justify-center"
                  onClick = {()=>{
                    dispatch(clearUserData());
                  }}>
                <DensityMediumIcon sx={{ color: common.black }}/>
                <img className = "w-[32px] h-[32px]" src = {userAvatar} />
              </div>
              :<>
                <StyledButton text='Login' type = "button" styleType="white"
                  handleClick={()=>{
                  navigate('/signin');
                }} />
                <StyledButton text='Sign up' type = "button" 
                  handleClick={()=>{
                  navigate('/signup');
                }} />
              </>
            }
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}