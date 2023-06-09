import * as React from "react";
  
import AppBar from "@mui/material/AppBar";
import Box from '@mui/material/Box';
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import {StyledButton} from '../components/StyledButton';
import IconButton from "@mui/material/IconButton";
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import linkupLogo from "../images/logo.png";
import searchIcon from "../images/Search.png";
import cartIcon from "../images/Cart.png";
import { useNavigate } from 'react-router-dom';
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
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Header() {
  const navigate = useNavigate();
  return (
    <div className="">
      <AppBar position="sticky" sx={{backgroundColor:"white"}}>
        <Toolbar>
          <img className='w-[48px] h-[48px]' src={linkupLogo} />
          <Search>
            <SearchIconWrapper>
              <img src={searchIcon} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton aria-label="show 4 goods" color="inherit">
              <Badge badgeContent={4} color="error">
                <img className='w-[24px] h-[24px]' src={cartIcon} />
              </Badge>
            </IconButton>
          </Box>
          <Button color="inherit" variant="contained"  sx={{color:'black', textTransform: 'none', borderRadius: '40px',}} 
            onClick={()=>{
            navigate('/signin');
          }}>
            Login</Button>
          <StyledButton text='Sign up' type = "button" 
            handleClick={()=>{
            navigate('/signup');
          }} />
        </Toolbar>
      </AppBar>
    </div>
  );
}