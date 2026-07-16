import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Minus, Plus, ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  clearSelectedProduct,
  fetchProductById,
} from "../features/products/productsSlice";
import { addItem } from "../features/cart/cartSlice";
import { ProductDetailSkeleton } from "../components/common/Skeleton";
import { ErrorAlert } from "../components/common/ErrorAlert";
import { RatingStars } from "../components/common/RatingStars";
import { Button } from "../components/common/Button";
import { formatCurrency, capitalize } from "../utils/format";

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { selectedProduct, detailStatus, detailError } = useAppSelector(
    (state) => state.products,
  );
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!Number.isNaN(productId)) {
      dispatch(fetchProductById(productId));
    }
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, productId]);

  if (Number.isNaN(productId)) {
    navigate("/404", { replace: true });
    return null;
  }

  const handleAddToCart = () => {
    if (!selectedProduct) return;
    dispatch(
      addItem({
        id: selectedProduct.id,
        title: selectedProduct.title,
        price: selectedProduct.price,
        image: selectedProduct.image,
        quantity,
      }),
    );
    toast.success(`${quantity} × ${selectedProduct.title} added to cart`);
  };

  return (
    <div>
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-nova-600 hover:text-nova-900 dark:text-nova-300 dark:hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to shop
      </Link>

      {detailStatus === "loading" && <ProductDetailSkeleton />}

      {detailStatus === "failed" && (
        <ErrorAlert
          message={detailError ?? "Unable to load this product."}
          onRetry={() => dispatch(fetchProductById(productId))}
        />
      )}

      {detailStatus === "succeeded" && selectedProduct && (
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="flex aspect-square items-center justify-center rounded-xl2 border border-nova-100 bg-white p-10 dark:border-nova-800">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.title}
              className="h-full w-full object-contain"
            />
          </div>

          <div>
            <span className="text-xs font-medium uppercase tracking-wide text-nova-400">
              {capitalize(selectedProduct.category)}
            </span>
            <h1 className="mt-1 font-display text-2xl font-bold sm:text-3xl">
              {selectedProduct.title}
            </h1>
            <div className="mt-3">
              <RatingStars
                rate={selectedProduct.rating.rate}
                count={selectedProduct.rating.count}
              />
            </div>
            <p className="mt-4 font-display text-3xl font-bold">
              {formatCurrency(selectedProduct.price)}
            </p>
            <p className="mt-4 leading-relaxed text-nova-600 dark:text-nova-300">
              {selectedProduct.description}
            </p>

            <div className="mt-6 flex items-center gap-4">
              <span className="text-sm font-medium">Quantity</span>
              <div className="flex items-center rounded-full border border-nova-200 dark:border-nova-700">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="rounded-l-full p-2 hover:bg-nova-100 dark:hover:bg-nova-800"
                >
                  <Minus className="h-4 w-4" aria-hidden="true" />
                </button>
                <span
                  className="min-w-[2.5rem] text-center font-medium"
                  aria-live="polite"
                >
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="rounded-r-full p-2 hover:bg-nova-100 dark:hover:bg-nova-800"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            <Button onClick={handleAddToCart} size="lg" className="mt-6">
              <ShoppingCart className="h-4 w-4" aria-hidden="true" />
              Add to cart
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
