import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  clearCart,
  selectCartItems,
  selectCartShipping,
  selectCartSubtotal,
  selectCartTax,
  selectCartTotal,
} from "../features/cart/cartSlice";
import { Button } from "../components/common/Button";
import { formatCurrency, generateOrderNumber } from "../utils/format";
import { validateRequired, validateZip } from "../utils/validation";

interface ShippingForm {
  fullName: string;
  address: string;
  city: string;
  zip: string;
}

interface ShippingErrors {
  fullName?: string;
  address?: string;
  city?: string;
  zip?: string;
}

export function CheckoutPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const items = useAppSelector(selectCartItems);
  const subtotal = useAppSelector(selectCartSubtotal);
  const shipping = useAppSelector(selectCartShipping);
  const tax = useAppSelector(selectCartTax);
  const total = useAppSelector(selectCartTotal);

  const [form, setForm] = useState<ShippingForm>({
    fullName: "",
    address: "",
    city: "",
    zip: "",
  });
  const [errors, setErrors] = useState<ShippingErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  const updateField = (field: keyof ShippingForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const nextErrors: ShippingErrors = {
      fullName: validateRequired(form.fullName, "Full name") ?? undefined,
      address: validateRequired(form.address, "Address") ?? undefined,
      city: validateRequired(form.city, "City") ?? undefined,
      zip: validateZip(form.zip) ?? undefined,
    };
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setIsSubmitting(false);
    setOrderNumber(generateOrderNumber());
    dispatch(clearCart());
  };

  if (orderNumber) {
    return (
      <div className="animate-fade-in mx-auto flex max-w-md flex-col items-center gap-4 rounded-xl2 border border-nova-100 bg-white p-10 text-center shadow-soft dark:border-nova-800 dark:bg-nova-900">
        <CheckCircle2 className="h-14 w-14 text-green-500" aria-hidden="true" />
        <h1 className="font-display text-2xl font-bold">Order confirmed!</h1>
        <p className="text-nova-500 dark:text-nova-400">
          Thanks for shopping with NovaCart. A confirmation has been sent to your inbox.
        </p>
        <div className="rounded-lg bg-nova-50 px-4 py-2 font-mono text-sm dark:bg-nova-800">
          Order #{orderNumber}
        </div>
        <Button onClick={() => navigate("/")} className="mt-2">
          Continue shopping
        </Button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-md text-center">
        <p className="font-display text-lg font-semibold">Your cart is empty</p>
        <p className="mt-1 text-sm text-nova-500 dark:text-nova-400">
          Add products to your cart before checking out.
        </p>
        <Button onClick={() => navigate("/")} className="mt-4">
          Browse products
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <h1 className="font-display text-2xl font-bold">Checkout</h1>
        <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
          <div>
            <label htmlFor="fullName" className="mb-1.5 block text-sm font-medium">
              Full name
            </label>
            <input
              id="fullName"
              value={form.fullName}
              onChange={(e) => updateField("fullName", e.target.value)}
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={errors.fullName ? "fullName-error" : undefined}
              className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm outline-none focus:border-nova-400 dark:bg-nova-900 ${
                errors.fullName
                  ? "border-red-400"
                  : "border-nova-200 dark:border-nova-700"
              }`}
            />
            {errors.fullName && (
              <p id="fullName-error" role="alert" className="mt-1 text-xs text-red-600">
                {errors.fullName}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="address" className="mb-1.5 block text-sm font-medium">
              Street address
            </label>
            <input
              id="address"
              value={form.address}
              onChange={(e) => updateField("address", e.target.value)}
              aria-invalid={Boolean(errors.address)}
              aria-describedby={errors.address ? "address-error" : undefined}
              className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm outline-none focus:border-nova-400 dark:bg-nova-900 ${
                errors.address ? "border-red-400" : "border-nova-200 dark:border-nova-700"
              }`}
            />
            {errors.address && (
              <p id="address-error" role="alert" className="mt-1 text-xs text-red-600">
                {errors.address}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="city" className="mb-1.5 block text-sm font-medium">
                City
              </label>
              <input
                id="city"
                value={form.city}
                onChange={(e) => updateField("city", e.target.value)}
                aria-invalid={Boolean(errors.city)}
                aria-describedby={errors.city ? "city-error" : undefined}
                className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm outline-none focus:border-nova-400 dark:bg-nova-900 ${
                  errors.city ? "border-red-400" : "border-nova-200 dark:border-nova-700"
                }`}
              />
              {errors.city && (
                <p id="city-error" role="alert" className="mt-1 text-xs text-red-600">
                  {errors.city}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="zip" className="mb-1.5 block text-sm font-medium">
                ZIP / postal code
              </label>
              <input
                id="zip"
                value={form.zip}
                onChange={(e) => updateField("zip", e.target.value)}
                aria-invalid={Boolean(errors.zip)}
                aria-describedby={errors.zip ? "zip-error" : undefined}
                className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm outline-none focus:border-nova-400 dark:bg-nova-900 ${
                  errors.zip ? "border-red-400" : "border-nova-200 dark:border-nova-700"
                }`}
              />
              {errors.zip && (
                <p id="zip-error" role="alert" className="mt-1 text-xs text-red-600">
                  {errors.zip}
                </p>
              )}
            </div>
          </div>

          <Button type="submit" isLoading={isSubmitting} size="lg" className="w-full">
            Place order
          </Button>
        </form>
      </div>

      <aside className="h-fit rounded-xl2 border border-nova-100 bg-white p-6 dark:border-nova-800 dark:bg-nova-900">
        <h2 className="font-display text-lg font-semibold">Order summary</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {items.map((item) => (
            <li key={item.id} className="flex justify-between gap-2">
              <span className="line-clamp-1 text-nova-600 dark:text-nova-300">
                {item.quantity} × {item.title}
              </span>
              <span className="shrink-0 font-medium">
                {formatCurrency(item.price * item.quantity)}
              </span>
            </li>
          ))}
        </ul>
        <dl className="mt-4 space-y-2 border-t border-nova-100 pt-4 text-sm dark:border-nova-800">
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
      </aside>
    </div>
  );
}
