# NovaCart

A premium e-commerce shopping cart and authentication flow built with React, TypeScript, Redux Toolkit, and the Context API. NovaCart pulls live product data from the [Fake Store API](https://fakestoreapi.com/products) and demonstrates a production-style architecture for state management, routing, and accessible UI design.

![NovaCart](./docs/screenshots/home.png)

## Features

- Product catalog with live search, category filters, and sorting (price, rating, name)
- Product detail pages with quantity selection and add-to-cart
- Persistent shopping cart with quantity controls, subtotal/shipping/tax/total breakdown, and a confirm-before-clear modal
- Mock authentication flow with inline validation, show/hide password, and a protected account page
- Checkout flow that requires authentication, validates shipping details, and ends in a polished order-confirmation screen
- Light and dark themes, persisted across sessions
- Loading skeletons, empty states, and friendly error messages with retry actions throughout
- Fully responsive, mobile-first layout with a mobile navigation menu
- Custom 404 page and toast notifications for key actions

## Acceptance Criteria Checklist

- [x] React Context API used for shared application state (`ThemeContext`)
- [x] Redux Toolkit store with 3 slices: `products`, `cart`, `auth`
- [x] `createAsyncThunk` used for real API calls (`fetchProducts`, `fetchProductById`) with pending/fulfilled/rejected handling
- [x] Fully functional, responsive, and visually polished UI
- [x] Cart persists across page refresh (localStorage)
- [x] Authenticated session persists across page refresh (localStorage)
- [x] Protected routes redirect unauthenticated users to login
- [x] Loading, empty, success, and error states implemented
- [x] Tests cover thunks, cart logic, theme toggling, login validation, protected routes, and a full add-to-cart flow
- [x] Project builds with no TypeScript or ESLint errors

## Technology Stack

| Category | Choice |
| --- | --- |
| Framework | React 18 + Vite |
| Language | TypeScript (strict mode) |
| Global state | Redux Toolkit + React Redux |
| Shared UI state | React Context API |
| Routing | React Router v6 |
| Styling | Tailwind CSS |
| Icons | lucide-react |
| Notifications | react-hot-toast |
| Testing | Vitest + React Testing Library |
| Linting/formatting | ESLint + Prettier |

## Architecture

The app follows a feature-based structure. Redux Toolkit owns data that is shared across many parts of the app and fetched from a server (`products`, `cart`, `auth`), while Context owns a single piece of pure UI state (`theme`) that every component needs but that has no server or async lifecycle. Pages compose feature components and hooks; components stay focused on presentation and delegate data access to typed Redux hooks.

### Context API usage

`ThemeContext` (`src/context/ThemeContext.tsx`) provides `theme` and `toggleTheme` to the whole tree. It initializes from `localStorage` (falling back to the OS color-scheme preference), persists changes back to `localStorage`, and toggles the `dark` class on `<html>` so Tailwind's `dark:` variants apply globally. This is a clean fit for Context because it is synchronous, has no server round-trip, and is consumed by many unrelated components (header, buttons, toasts).

### Redux slices

- **`productsSlice`** — `products`, `selectedProduct`, `categories`, `searchQuery`, `selectedCategory`, `sortOption`, and separate loading/error state for the list vs. the detail view. Exposes a memoized-style selector, `selectFilteredProducts`, that applies search, category, and sort together.
- **`cartSlice`** — cart `items` with `addItem`, `removeItem`, `increaseQuantity`, `decreaseQuantity`, and `clearCart` reducers. Derived totals (`subtotal`, `shipping`, `tax`, `total`) are computed with selectors rather than stored, so they can never drift out of sync with the item list. The store subscribes to cart changes and persists them to `localStorage`.
- **`authSlice`** — mock `user`/session state driven by the `login` thunk, plus a `logout` reducer. The session persists in `localStorage` so a refresh keeps the user logged in.

### `createAsyncThunk` usage

`fetchProducts` and `fetchProductById` (`src/features/products/productsSlice.ts`) call the Fake Store API through a small typed `productApi` service (`src/services/productApi.ts`) with centralized error handling. Both thunks pass through the abort `signal` so requests are cancelled if a component unmounts mid-flight, and both are fully wired through `pending` / `fulfilled` / `rejected` cases with user-facing loading skeletons and retryable error alerts. `login` in `authSlice` also uses `createAsyncThunk` to simulate a network round trip against the demo credentials.

## Installation

```bash
npm install
```

Copy the environment example and adjust if needed (the default already points at the Fake Store API):

```bash
cp .env.example .env
```

## Development

```bash
npm run dev
```

## Testing

```bash
npm run test           # run once
npm run test:watch     # watch mode
npm run test:coverage  # with coverage report
```

## Build

```bash
npm run build
npm run preview   # preview the production build locally
```

## Linting & Formatting

```bash
npm run lint
npm run format
```

## Folder Structure

```
src/
  app/            # Redux store and typed hooks
  context/        # ThemeContext
  features/
    products/     # productsSlice, types
    cart/         # cartSlice, types
    auth/         # authSlice
  services/       # productApi (Fake Store API client)
  components/
    common/       # Button, Modal, Skeleton, ErrorAlert, RatingStars
    layout/        # Header, Footer, Layout
    products/      # ProductCard, ProductGrid, FilterBar
    cart/          # CartItemRow
    auth/          # LoginForm, ProtectedRoute
  pages/          # HomePage, ProductDetailPage, CartPage, LoginPage, AccountPage, CheckoutPage, NotFoundPage
  routes/         # AppRoutes
  hooks/          # useDebounce
  utils/          # format, validation
  tests/          # Vitest + Testing Library suites
  App.tsx
  main.tsx
```

## Demo Credentials

```
Email:    demo@novacart.com
Password: password123
```

## API Information

Product data is served by the public [Fake Store API](https://fakestoreapi.com/products) (`GET /products`, `GET /products/:id`, `GET /products/categories`). No API key is required. The base URL is configurable via `VITE_API_BASE_URL`.

## Screenshots

Add screenshots of the running app here before publishing:

- `docs/screenshots/home.png` — catalog with filters
- `docs/screenshots/product-detail.png` — product detail page
- `docs/screenshots/cart.png` — cart with totals
- `docs/screenshots/checkout-success.png` — order confirmation
- `docs/screenshots/dark-mode.png` — dark theme

## Deployment

### Vercel

1. Push this repository to GitHub.
2. Import the repository at [vercel.com/new](https://vercel.com/new).
3. Framework preset: **Vite**. Build command `npm run build`, output directory `dist`.
4. Add `VITE_API_BASE_URL` as an environment variable if you want to override the default.

### Netlify

1. Push this repository to GitHub.
2. Create a new site at [app.netlify.com](https://app.netlify.com) from the repository.
3. Build command: `npm run build`. Publish directory: `dist`.
4. Add `VITE_API_BASE_URL` under Site settings → Environment variables if needed.

## Known Limitations

- Authentication is fully mocked client-side; there is no real backend or token expiry.
- The Fake Store API has a fixed catalog, so category counts and images are limited to what it provides.
- Checkout does not integrate a real payment provider — order submission is simulated.

## Future Improvements

- Wishlist / saved-items feature
- Product reviews and Q&A
- Real payment integration (e.g. Stripe) behind the checkout form
- Pagination or infinite scroll for larger catalogs
- End-to-end tests (Playwright/Cypress) covering full checkout flows
#   - s t a t e - m a n a g e d - R e a c t - a p p  
 