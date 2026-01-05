import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { cartInitialState } from '../../utils/config';
import type { CartITem } from '../../types';

const cartSlice = createSlice({
   name: 'cart',
   initialState: cartInitialState,
   reducers: {
      addItem(state, action: PayloadAction<CartITem>) {
         state.cart.push(action.payload);
      },
      increaseItemQuantity(state, action: PayloadAction<number>) {
         const item = state.cart.find(
            (item: CartITem) => item.pizzaId === action.payload,
         );
         if (item) {
            item.quantity++;
            item.totalPrice = item.quantity * item.unitPrice;
         }
      },
      decreaseItemQuantity(state, action: PayloadAction<number>) {
         const item = state.cart.find(
            (item: CartITem) => item.pizzaId === action.payload,
         );
         if (item) {
            item.quantity--;
            item.totalPrice = item.quantity * item.unitPrice;
            if (item.quantity === 0)
               cartSlice.caseReducers.deleteItem(state, action);
         }
      },
      deleteItem(state, action: PayloadAction<number>) {
         state.cart = state.cart.filter(
            (item: CartITem) => item.pizzaId !== action.payload,
         );
      },
      clearCart(state) {
         state.cart = [];
      },
   },
});
export const {
   addItem,
   increaseItemQuantity,
   decreaseItemQuantity,
   deleteItem,
   clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;

// removed for performnace issues
// export const getTotalCartQuantity = (state: RootStateType) =>
//    state.cart.cart.reduce(
//       (sum: number, item: CartITem) => sum + item.quantity,
//       0,
//    );

// export const getTotalCartPrice = (state: RootStateType) =>
//    state.cart.cart.reduce(
//       (sum: number, item: CartITem) => sum + item.totalPrice,
//       0,
//    );

//    reselect library can be used to memoize these selectors for better performance
