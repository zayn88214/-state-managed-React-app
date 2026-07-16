import type { Product } from "../features/products/productTypes";

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "https://fakestoreapi.com";

export class ApiError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function request<T>(path: string, signal?: AbortSignal): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${BASE_URL}${path}`, { signal });
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      throw err;
    }
    throw new ApiError("Network error. Check your connection and try again.");
  }

  if (!response.ok) {
    throw new ApiError(
      `Request failed with status ${response.status}. Please try again.`,
      response.status,
    );
  }

  return (await response.json()) as T;
}

export const productApi = {
  getAll: (signal?: AbortSignal) => request<Product[]>("/products", signal),
  getById: (id: number, signal?: AbortSignal) =>
    request<Product>(`/products/${id}`, signal),
  getCategories: (signal?: AbortSignal) =>
    request<string[]>("/products/categories", signal),
};
