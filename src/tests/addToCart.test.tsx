import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Toaster } from "react-hot-toast";
import { ProductCard } from "../components/products/ProductCard";
import { selectCartCount } from "../features/cart/cartSlice";
import { renderWithProviders } from "./test-utils";
import type { Product } from "../features/products/productTypes";

const product: Product = {
  id: 7,
  title: "Insulated Travel Mug",
  price: 18.5,
  description: "Keeps drinks hot or cold for hours.",
  category: "home",
  image: "https://example.com/mug.jpg",
  rating: { rate: 4.2, count: 88 },
};

describe("Add to cart flow", () => {
  it("adds the product to the cart and shows a confirmation toast", async () => {
    const user = userEvent.setup();
    const { store } = renderWithProviders(
      <>
        <ProductCard product={product} />
        <Toaster />
      </>,
    );

    await user.click(screen.getByRole("button", { name: /add to cart/i }));

    expect(selectCartCount(store.getState())).toBe(1);
    expect(await screen.findByText(/added to cart/i)).toBeInTheDocument();
  });
});
