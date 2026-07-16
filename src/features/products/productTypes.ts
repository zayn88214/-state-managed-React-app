export interface ProductRating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: ProductRating;
}

export type SortOption = "default" | "price-asc" | "price-desc" | "rating" | "name";

export interface ProductsState {
  products: Product[];
  selectedProduct: Product | null;
  categories: string[];
  searchQuery: string;
  selectedCategory: string;
  sortOption: SortOption;
  status: "idle" | "loading" | "succeeded" | "failed";
  detailStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  detailError: string | null;
}
