import { Minus, Plus, Trash2 } from "lucide-react";
import type { CartItem } from "../../features/cart/cartTypes";
import { useAppDispatch } from "../../app/hooks";
import {
  decreaseQuantity,
  increaseQuantity,
  removeItem,
} from "../../features/cart/cartSlice";
import { formatCurrency } from "../../utils/format";

export function CartItemRow({ item }: { item: CartItem }) {
  const dispatch = useAppDispatch();

  return (
    <li className="flex items-center gap-4 border-b border-nova-100 py-4 last:border-none dark:border-nova-800">
      <img
        src={item.image}
        alt={item.title}
        className="h-20 w-20 shrink-0 rounded-lg border border-nova-100 bg-white object-contain p-2 dark:border-nova-800"
      />
      <div className="min-w-0 flex-1">
        <p className="line-clamp-2 text-sm font-medium">{item.title}</p>
        <p className="mt-1 text-sm text-nova-500 dark:text-nova-400">
          {formatCurrency(item.price)} each
        </p>
        <div className="mt-2 flex items-center gap-2">
          <div className="flex items-center rounded-full border border-nova-200 dark:border-nova-700">
            <button
              onClick={() => dispatch(decreaseQuantity(item.id))}
              aria-label={`Decrease quantity of ${item.title}`}
              className="rounded-l-full p-1.5 hover:bg-nova-100 dark:hover:bg-nova-800"
            >
              <Minus className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
            <span
              className="min-w-[2rem] text-center text-sm font-medium"
              aria-live="polite"
            >
              {item.quantity}
            </span>
            <button
              onClick={() => dispatch(increaseQuantity(item.id))}
              aria-label={`Increase quantity of ${item.title}`}
              className="rounded-r-full p-1.5 hover:bg-nova-100 dark:hover:bg-nova-800"
            >
              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
          <button
            onClick={() => dispatch(removeItem(item.id))}
            aria-label={`Remove ${item.title} from cart`}
            className="rounded-full p-1.5 text-nova-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
      <p className="font-display text-sm font-semibold">
        {formatCurrency(item.price * item.quantity)}
      </p>
    </li>
  );
}
