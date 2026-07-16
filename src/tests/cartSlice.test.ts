import { describe, expect, it } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer, {
  addItem,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  selectCartSubtotal,
  selectCartTotal,
} from "../features/cart/cartSlice";

function createTestStore() {
  return configureStore({ reducer: { cart: cartReducer } });
}

const sampleItem = {
  id: 1,
  title: "Wireless Headphones",
  price: 50,
  image: "https://example.com/headphones.jpg",
};

describe("cartSlice", () => {
  it("adds a new item to the cart", () => {
    const store = createTestStore();
    store.dispatch(addItem(sampleItem));
    expect(store.getState().cart.items).toHaveLength(1);
    expect(store.getState().cart.items[0].quantity).toBe(1);
  });

  it("increases quantity when the same item is added again", () => {
    const store = createTestStore();
    store.dispatch(addItem(sampleItem));
    store.dispatch(addItem(sampleItem));
    expect(store.getState().cart.items).toHaveLength(1);
    expect(store.getState().cart.items[0].quantity).toBe(2);
  });

  it("increases and decreases quantity", () => {
    const store = createTestStore();
    store.dispatch(addItem(sampleItem));
    store.dispatch(increaseQuantity(1));
    expect(store.getState().cart.items[0].quantity).toBe(2);
    store.dispatch(decreaseQuantity(1));
    expect(store.getState().cart.items[0].quantity).toBe(1);
  });

  it("removes the item once quantity is decreased to zero", () => {
    const store = createTestStore();
    store.dispatch(addItem(sampleItem));
    store.dispatch(decreaseQuantity(1));
    expect(store.getState().cart.items).toHaveLength(0);
  });

  it("removes an item explicitly", () => {
    const store = createTestStore();
    store.dispatch(addItem(sampleItem));
    store.dispatch(removeItem(1));
    expect(store.getState().cart.items).toHaveLength(0);
  });

  it("clears the entire cart", () => {
    const store = createTestStore();
    store.dispatch(addItem(sampleItem));
    store.dispatch(addItem({ ...sampleItem, id: 2 }));
    store.dispatch(clearCart());
    expect(store.getState().cart.items).toHaveLength(0);
  });

  it("calculates subtotal and total including shipping and tax", () => {
    const store = createTestStore();
    store.dispatch(addItem({ ...sampleItem, quantity: 2 }));

    const state = store.getState() as never;
    expect(selectCartSubtotal(state)).toBe(100);
    // total = subtotal + flat shipping + 8% tax
    expect(selectCartTotal(state)).toBeCloseTo(100 + 6.99 + 8, 2);
  });
});
