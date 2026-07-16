import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import productsReducer, {
  fetchProducts,
  setSearchQuery,
  selectFilteredProducts,
} from "../features/products/productsSlice";
import type { Product } from "../features/products/productTypes";

const mockProduct: Product = {
  id: 1,
  title: "Classic Denim Jacket",
  price: 59.99,
  description: "A timeless denim jacket.",
  category: "clothing",
  image: "https://example.com/jacket.jpg",
  rating: { rate: 4.5, count: 120 },
};

function createTestStore() {
  return configureStore({ reducer: { products: productsReducer } });
}

describe("productsSlice", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("fetchProducts.fulfilled populates products and categories on success", async () => {
    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: async () => [mockProduct],
    });

    const store = createTestStore();
    await store.dispatch(fetchProducts());

    const state = store.getState().products;
    expect(state.status).toBe("succeeded");
    expect(state.products).toHaveLength(1);
    expect(state.categories).toEqual(["clothing"]);
    expect(state.error).toBeNull();
  });

  it("fetchProducts.rejected sets an error message on failure", async () => {
    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({}),
    });

    const store = createTestStore();
    await store.dispatch(fetchProducts());

    const state = store.getState().products;
    expect(state.status).toBe("failed");
    expect(state.error).toMatch(/500/);
  });

  it("filters products by search query via selectFilteredProducts", () => {
    const store = createTestStore();
    store.dispatch({
      type: fetchProducts.fulfilled.type,
      payload: [mockProduct, { ...mockProduct, id: 2, title: "Running Shoes" }],
    });
    store.dispatch(setSearchQuery("denim"));

    const result = selectFilteredProducts(store.getState() as never);
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Classic Denim Jacket");
  });
});
