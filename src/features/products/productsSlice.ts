import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { productApi, ApiError } from "../../services/productApi";
import type { Product, ProductsState, SortOption } from "./productTypes";
import type { RootState } from "../../app/store";

const initialState: ProductsState = {
  products: [],
  selectedProduct: null,
  categories: [],
  searchQuery: "",
  selectedCategory: "all",
  sortOption: "default",
  status: "idle",
  detailStatus: "idle",
  error: null,
  detailError: null,
};

export const fetchProducts = createAsyncThunk<Product[], void, { rejectValue: string }>(
  "products/fetchProducts",
  async (_, { signal, rejectWithValue }) => {
    try {
      return await productApi.getAll(signal);
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        throw err;
      }
      const message =
        err instanceof ApiError ? err.message : "Unable to load products right now.";
      return rejectWithValue(message);
    }
  },
);

export const fetchProductById = createAsyncThunk<
  Product,
  number,
  { rejectValue: string }
>("products/fetchProductById", async (id, { signal, rejectWithValue }) => {
  try {
    return await productApi.getById(id, signal);
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      throw err;
    }
    const message =
      err instanceof ApiError ? err.message : "Unable to load this product.";
    return rejectWithValue(message);
  }
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setSelectedCategory(state, action: PayloadAction<string>) {
      state.selectedCategory = action.payload;
    },
    setSortOption(state, action: PayloadAction<SortOption>) {
      state.sortOption = action.payload;
    },
    clearSelectedProduct(state) {
      state.selectedProduct = null;
      state.detailStatus = "idle";
      state.detailError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
        state.categories = Array.from(
          new Set(action.payload.map((p) => p.category)),
        ).sort();
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        if (action.meta.aborted) return;
        state.status = "failed";
        state.error = action.payload ?? "Something went wrong while loading products.";
      })
      .addCase(fetchProductById.pending, (state) => {
        state.detailStatus = "loading";
        state.detailError = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.detailStatus = "succeeded";
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        if (action.meta.aborted) return;
        state.detailStatus = "failed";
        state.detailError = action.payload ?? "Unable to load this product.";
      });
  },
});

export const {
  setSearchQuery,
  setSelectedCategory,
  setSortOption,
  clearSelectedProduct,
} = productsSlice.actions;

export const selectFilteredProducts = (state: RootState): Product[] => {
  const { products, searchQuery, selectedCategory, sortOption } = state.products;

  let result = products.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.trim().toLowerCase()),
  );

  if (selectedCategory !== "all") {
    result = result.filter((p) => p.category === selectedCategory);
  }

  switch (sortOption) {
    case "price-asc":
      result = [...result].sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result = [...result].sort((a, b) => b.price - a.price);
      break;
    case "rating":
      result = [...result].sort((a, b) => b.rating.rate - a.rating.rate);
      break;
    case "name":
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
      break;
    default:
      break;
  }

  return result;
};

export default productsSlice.reducer;
