import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, Moon, Search, ShoppingBag, Sun, User, X } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectCartCount } from "../../features/cart/cartSlice";
import { selectIsAuthenticated } from "../../features/auth/authSlice";
import { setSearchQuery } from "../../features/products/productsSlice";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
    isActive
      ? "bg-nova-900 text-white dark:bg-white dark:text-nova-950"
      : "text-nova-600 hover:bg-nova-100 hover:text-nova-900 dark:text-nova-300 dark:hover:bg-nova-800/60"
  }`;

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cartCount = useAppSelector(selectCartCount);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(setSearchQuery(searchValue));
    navigate("/");
  };

  return (
    <header
      className={`sticky top-0 z-40 glass-surface transition-shadow duration-300 ${
        scrolled ? "shadow-soft border-b border-nova-100 dark:border-nova-800" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-8xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2 font-display text-xl font-extrabold tracking-tight"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold-gradient text-sm text-nova-950">
            N
          </span>
          NovaCart
        </Link>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Primary navigation"
        >
          <NavLink to="/" className={navLinkClass} end>
            Shop
          </NavLink>
          <NavLink to="/cart" className={navLinkClass}>
            Cart
          </NavLink>
          <NavLink to="/account" className={navLinkClass}>
            Account
          </NavLink>
        </nav>

        <form
          onSubmit={handleSearchSubmit}
          className="hidden flex-1 max-w-md md:flex"
          role="search"
        >
          <label htmlFor="header-search" className="sr-only">
            Search products
          </label>
          <div className="relative w-full">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-nova-400"
              aria-hidden="true"
            />
            <input
              id="header-search"
              type="search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-full border border-nova-200 bg-white/70 py-2 pl-9 pr-4 text-sm outline-none transition-colors focus:border-accent-400 dark:border-nova-700 dark:bg-nova-900/60"
            />
          </div>
        </form>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <button
            onClick={toggleTheme}
            aria-label={
              theme === "light" ? "Switch to dark theme" : "Switch to light theme"
            }
            className="rounded-full p-2 text-nova-600 hover:bg-nova-100 dark:text-nova-300 dark:hover:bg-nova-800"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Sun className="h-5 w-5" aria-hidden="true" />
            )}
          </button>

          <Link
            to={isAuthenticated ? "/account" : "/login"}
            aria-label={isAuthenticated ? "View account" : "Log in"}
            className="hidden rounded-full p-2 text-nova-600 hover:bg-nova-100 dark:text-nova-300 dark:hover:bg-nova-800 sm:block"
          >
            <User className="h-5 w-5" aria-hidden="true" />
          </Link>

          <Link
            to="/cart"
            aria-label={`View cart, ${cartCount} item${cartCount === 1 ? "" : "s"}`}
            className="relative rounded-full p-2 text-nova-600 hover:bg-nova-100 dark:text-nova-300 dark:hover:bg-nova-800"
          >
            <ShoppingBag className="h-5 w-5" aria-hidden="true" />
            {cartCount > 0 && (
              <span
                className="absolute -right-0.5 -top-0.5 flex h-4.5 min-w-[18px] animate-fade-in items-center justify-center rounded-full bg-accent-500 px-1 text-[10px] font-bold text-white"
                aria-hidden="true"
              >
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

          <button
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            className="rounded-full p-2 text-nova-600 hover:bg-nova-100 dark:text-nova-300 dark:hover:bg-nova-800 lg:hidden"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          id="mobile-nav"
          className="glass-surface animate-fade-in border-t border-nova-100 px-4 py-4 dark:border-nova-800 lg:hidden"
        >
          <form onSubmit={handleSearchSubmit} className="mb-4" role="search">
            <label htmlFor="mobile-search" className="sr-only">
              Search products
            </label>
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-nova-400"
                aria-hidden="true"
              />
              <input
                id="mobile-search"
                type="search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search products..."
                className="w-full rounded-full border border-nova-200 bg-white py-2 pl-9 pr-4 text-sm outline-none focus:border-accent-400 dark:border-nova-700 dark:bg-nova-900"
              />
            </div>
          </form>
          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            <NavLink
              to="/"
              className={navLinkClass}
              end
              onClick={() => setMobileOpen(false)}
            >
              Shop
            </NavLink>
            <NavLink
              to="/cart"
              className={navLinkClass}
              onClick={() => setMobileOpen(false)}
            >
              Cart
            </NavLink>
            <NavLink
              to={isAuthenticated ? "/account" : "/login"}
              className={navLinkClass}
              onClick={() => setMobileOpen(false)}
            >
              {isAuthenticated ? "Account" : "Log in"}
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
}
