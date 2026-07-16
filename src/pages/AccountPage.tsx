import toast from "react-hot-toast";
import { LogOut, Mail, ShoppingBag, User } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout, selectCurrentUser } from "../features/auth/authSlice";
import { selectCartCount } from "../features/cart/cartSlice";
import { Button } from "../components/common/Button";

export function AccountPage() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const cartCount = useAppSelector(selectCartCount);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
  };

  if (!user) return null;

  return (
    <div className="mx-auto max-w-lg">
      <h1 className="font-display text-2xl font-bold">My account</h1>
      <div className="mt-6 rounded-xl2 border border-nova-100 bg-white p-6 shadow-soft dark:border-nova-800 dark:bg-nova-900">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-gradient text-nova-950">
            <User className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <p className="font-display text-lg font-semibold">{user.name}</p>
            <p className="flex items-center gap-1.5 text-sm text-nova-500 dark:text-nova-400">
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              {user.email}
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2 rounded-lg bg-nova-50 p-4 text-sm dark:bg-nova-800/50">
          <ShoppingBag className="h-4 w-4 text-nova-500" aria-hidden="true" />
          <span>
            You have <strong>{cartCount}</strong> item{cartCount === 1 ? "" : "s"} in your
            cart right now.
          </span>
        </div>

        <Button onClick={handleLogout} variant="secondary" className="mt-6 w-full">
          <LogOut className="h-4 w-4" aria-hidden="true" />
          Log out
        </Button>
      </div>
    </div>
  );
}
