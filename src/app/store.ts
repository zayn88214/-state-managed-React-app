import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products/productsSlice";
import cartReducer, { saveCartToStorage } from "../features/cart/cartSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    auth: authReducer,
  },
});

let previousCartItems = store.getState().cart.items;
store.subscribe(() => {
  const currentCartItems = store.getState().cart.items;
  if (currentCartItems !== previousCartItems) {
    previousCartItems = currentCartItems;
    saveCartToStorage(currentCartItems);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
