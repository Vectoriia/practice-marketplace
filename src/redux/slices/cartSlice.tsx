import {  createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { CartItemInfo, ProductInfo } from '../../pages/HomePage'
import { stat } from 'fs'

// Define a type for the slice state
interface CartState {
  items: CartItemInfo[]
}

// Define the initial state using that type
const initialState: CartState = {
  items: []
}
interface EditItemProps{
  id: number,
  operator: number,
}

export const cartSlice = createSlice({
  name: 'cart',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartItemInfo>) => {
      state.items = [action.payload, ...state.items];
    },
    deleteItemFromCart: (state, action: PayloadAction<number>) => {
      const index = state.items.findIndex(element => element.id == action.payload);
      if (index >= 0) {
        let tmpCart = [...state.items];
        tmpCart.splice(index, 1);
        state.items = tmpCart;
      }
    },
    editItemCount:(state, action: PayloadAction<EditItemProps>)=>{
      const index = state.items.findIndex(element => element.id == action.payload.id);
      if (index >= 0) {
        let tmpItem = state.items[index];

        if(tmpItem.amount + action.payload.operator !== 0){
          state.items[index]= {
            ...state.items[index], amount: tmpItem.amount + action.payload.operator
          }
        }
      }
    }
  }  
})

export const { addItemToCart, deleteItemFromCart, editItemCount } = cartSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCart = (state: RootState) => state.cart.items
export const getCartTotalPrice = (state: RootState) => state.cart.items.reduce((acc, next)=>acc+=(next.amount * next.price),0)

export default cartSlice.reducer