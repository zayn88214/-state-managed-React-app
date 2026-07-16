import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  clearCart,
  selectCartItems,
  selectCartShipping,
  selectCartSubtotal,
  selectCartTax,
  selectCartTotal,
} from "../features/cart/cartSlice";
import { CartItemRow } from "../components/cart/CartItemRow";
import { Button } from "../components/common/Button";
import { Modal } from "../components/common/Modal";
import { formatCurrency } from "../utils/format";

export function CartPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const items = useAppSelector(selectCartItems);
  const subtotal = useAppSelector(selectCartSubtotal);
  const shipping = useAppSelector(selectCartShipping);
  const tax = useAppSelector(selectCartTax);
  const total = useAppSelector(selectCartTotal);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleClearCart = () => {
    dispatch(clearCart());
    setConfirmOpen(false);
    toast.success("Cart cleared");
  };

  if (items.length === 0) {
    return (
      <div className="animate-fade-in flex flex-col items-center gap-4 rounded-xl2 border border-dashed border-nova-200 py-24 text-center dark:border-nova-800">
        <ShoppingBag
          className="h-10 w-10 text-nova-300 dark:text-nova-600"
          aria-hidden="true"
        />
        <div>
          <p className="font-display text-lg font-semibold">Your cart is empty</p>
          <p className="mt-1 text-sm text-nova-500 dark:text-nova-400">
            Browse the catalog and add something you like.
          </p>
        </div>
        <Link to="/">
          <Button>Continue shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="font-display text-2xl font-bold">Your cart</h1>
          <button
            onClick={() => setConfirmOpen(true)}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-nova-500 hover:text-red-600 dark:text-nova-400"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            Clear cart
          </button>
        </div>
        <ul className="rounded-xl2 border border-nova-100 bg-white px-4 dark:border-nova-800 dark:bg-nova-900">
          {items.map((item) => (
            <CartItemRow key={item.id} item={item} />
          ))}
        </ul>
      </div>

      <aside className="h-fit rounded-xl2 border border-nova-100 bg-white p-6 dark:border-nova-800 dark:bg-nova-900">
        <h2 className="font-display text-lg font-semibold">Order summary</h2>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-nova-500 dark:text-nova-400">Subtotal</dt>
            <dd>{formatCurrency(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-nova-500 dark:text-nova-400">Shipping</dt>
            <dd>{formatCurrency(shipping)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-nova-500 dark:text-nova-400">Tax</dt>
            <dd>{formatCurrency(tax)}</dd>
          </div>
          <div className="flex justify-between border-t border-nova-100 pt-3 font-display text-base font-bold dark:border-nova-800">
            <dt>Total</dt>
            <dd>{formatCurrency(total)}</dd>
          </div>
        </dl>
        <Button onClick={() => navigate("/checkout")} className="mt-6 w-full" size="lg">
          Proceed to checkout
        </Button>
      </aside>

      <Modal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Clear your cart?"
      >
        <p className="text-sm text-nova-600 dark:text-nova-300">
          This removes all items from your cart. This action can&apos;t be undone.
        </p>
        <div className="mt-5 flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setConfirmOpen(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleClearCart}>
            Clear cart
          </Button>
        </div>
      </Modal>
    </div>
  );
}
