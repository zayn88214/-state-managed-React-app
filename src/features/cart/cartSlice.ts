import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem, CartState } from "./cartTypes";
import type { RootState } from "../../app/store";

const CART_STORAGE_KEY = "novacart:cart";

function loadCartFromStorage(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function saveCartToStorage(items: CartItem[]): void {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Storage may be unavailable (e.g. private browsing) — fail silently.
  }
}

const initialState: CartState = {
  items: loadCartFromStorage(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(
      state,
      action: PayloadAction<{
        id: number;
        title: string;
        price: number;
        image: string;
        quantity?: number;
      }>,
    ) {
      const { id, title, price, image, quantity = 1 } = action.payload;
      const existing = state.items.find((item) => item.id === id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ id, title, price, image, quantity });
      }
    },
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    increaseQuantity(state, action: PayloadAction<number>) {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.quantity += 1;
    },
    decreaseQuantity(state, action: PayloadAction<number>) {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        item.quantity -= 1;
        if (item.quantity <= 0) {
          state.items = state.items.filter((i) => i.id !== action.payload);
        }
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, increaseQuantity, decreaseQuantity, clearCart } =
  cartSlice.actions;

const TAX_RATE = 0.08;
const SHIPPING_FLAT_RATE = 6.99;

export const selectCartItems = (state: RootState): CartItem[] => state.cart.items;

export const selectCartCount = (state: RootState): number =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);

export const selectCartSubtotal = (state: RootState): number =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

export const selectCartShipping = (state: RootState): number =>
  state.cart.items.length === 0 ? 0 : SHIPPING_FLAT_RATE;

export const selectCartTax = (state: RootState): number =>
  selectCartSubtotal(state) * TAX_RATE;

export const selectCartTotal = (state: RootState): number =>
  selectCartSubtotal(state) + selectCartShipping(state) + selectCartTax(state);

export default cartSlice.reducer;
