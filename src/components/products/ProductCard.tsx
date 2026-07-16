import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Heart, ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import type { Product } from "../../features/products/productTypes";
import { RatingStars } from "../common/RatingStars";
import { Button } from "../common/Button";
import { useAppDispatch } from "../../app/hooks";
import { addItem } from "../../features/cart/cartSlice";
import { formatCurrency, capitalize } from "../../utils/format";

// Fake Store API has no discount/stock fields — derive a stable, deterministic
// "on sale" badge from the product id so the UI stays consistent across renders.
function isOnSale(id: number) {
  return id % 4 === 0;
}

export function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const [wishlisted, setWishlisted] = useState(false);
  const onSale = isOnSale(product.id);
  const originalPrice = onSale ? product.price * 1.2 : null;

  const handleAddToCart = () => {
    dispatch(
      addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      }),
    );
    toast.success(`${product.title} added to cart`);
  };

  const toggleWishlist = () => {
    setWishlisted((current) => !current);
    toast.success(
      wishlisted ? `Removed ${product.title} from wishlist` : `Saved ${product.title} to wishlist`,
    );
  };

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl2 border border-nova-100 bg-white shadow-soft transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-card focus-within:-translate-y-1.5 focus-within:shadow-card dark:border-nova-800 dark:bg-nova-900">
      <div className="relative h-48 bg-white dark:bg-white">
        {onSale && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-gold-gradient px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-nova-950 shadow-soft">
            Sale
          </span>
        )}
        <button
          onClick={toggleWishlist}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wishlisted}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-nova-500 opacity-0 shadow-soft transition-all duration-200 hover:text-red-500 group-hover:opacity-100 focus-visible:opacity-100 dark:bg-nova-900/90"
        >
          <Heart
            className={`h-4 w-4 ${wishlisted ? "fill-red-500 text-red-500" : ""}`}
            aria-hidden="true"
          />
        </button>
        <Link
          to={`/products/${product.id}`}
          className="flex h-full items-center justify-center p-6"
        >
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-contain transition-transform duration-300 ease-out group-hover:scale-105"
          />
        </Link>
        <Link
          to={`/products/${product.id}`}
          aria-label={`Quick view ${product.title}`}
          className="absolute inset-x-3 bottom-3 z-10 flex translate-y-2 items-center justify-center gap-1.5 rounded-full bg-nova-950/85 py-2 text-xs font-semibold text-white opacity-0 backdrop-blur transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <Eye className="h-3.5 w-3.5" aria-hidden="true" />
          Quick view
        </Link>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-nova-400">
            {capitalize(product.category)}
          </span>
          <span className="flex items-center gap-1 text-[11px] font-medium text-sage-600 dark:text-sage-400">
            <span className="h-1.5 w-1.5 rounded-full bg-sage-500" aria-hidden="true" />
            In stock
          </span>
        </div>
        <Link
          to={`/products/${product.id}`}
          className="line-clamp-2 font-display text-sm font-semibold leading-snug hover:text-accent-600 dark:hover:text-accent-400"
        >
          {product.title}
        </Link>
        <RatingStars rate={product.rating.rate} count={product.rating.count} />
        <div className="mt-auto flex items-center gap-2 pt-2">
          <span className="font-display text-lg font-bold">
            {formatCurrency(product.price)}
          </span>
          {originalPrice && (
            <span className="text-sm text-nova-400 line-through">
              {formatCurrency(originalPrice)}
            </span>
          )}
        </div>
        <Button onClick={handleAddToCart} size="sm" className="mt-1 w-full">
          <ShoppingCart className="h-4 w-4" aria-hidden="true" />
          Add to cart
        </Button>
      </div>
    </div>
  );
}
