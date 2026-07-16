# NovaCart

NovaCart is a modern e-commerce application built with React, TypeScript, Redux Toolkit, and the Context API. It uses the Fake Store API to fetch real product data and demonstrates how to build a scalable online shopping experience with clean architecture, responsive design, and efficient state management.

---

# Features

NovaCart includes everything you'd expect from a modern shopping application:

* Browse products from the Fake Store API
* Search products instantly
* Filter products by category
* Sort products by price, rating, or name
* View detailed product information
* Select quantities before adding items to the cart
* Fully functional shopping cart with:

  * Quantity controls
  * Remove items
  * Cart summary
  * Shipping, tax, and total calculations
  * Confirmation dialog before clearing the cart
* Mock authentication system with validation
* Protected account page
* Secure checkout flow that requires login
* Shipping form validation
* Order confirmation page
* Light and dark mode with saved preferences
* Responsive design for desktop, tablet, and mobile
* Loading skeletons, empty states, and helpful error messages
* Toast notifications for important actions
* Custom 404 page

---

# Project Highlights

This project demonstrates several modern React development practices:

* Redux Toolkit for application state
* React Context API for theme management
* React Router v6 for navigation
* TypeScript in strict mode
* Tailwind CSS for styling
* API integration using async thunks
* Local storage persistence
* Responsive UI
* Reusable components
* Clean folder organization
* Comprehensive testing

---

# Tech Stack

| Category         | Technology                     |
| ---------------- | ------------------------------ |
| Frontend         | React 18 + Vite                |
| Language         | TypeScript                     |
| State Management | Redux Toolkit                  |
| UI State         | React Context API              |
| Routing          | React Router v6                |
| Styling          | Tailwind CSS                   |
| Icons            | Lucide React                   |
| Notifications    | React Hot Toast                |
| Testing          | Vitest + React Testing Library |
| Code Quality     | ESLint + Prettier              |

---

# Project Structure

The project follows a feature-based architecture to keep the codebase organized and easy to maintain.

```
src/
│
├── app/                 # Redux store and hooks
├── context/             # Theme context
├── features/
│   ├── auth/
│   ├── cart/
│   └── products/
│
├── services/            # API services
├── components/
│   ├── auth/
│   ├── cart/
│   ├── common/
│   ├── layout/
│   └── products/
│
├── pages/
├── routes/
├── hooks/
├── utils/
├── tests/
│
├── App.tsx
└── main.tsx
```

---

# State Management

The application uses both Redux Toolkit and React Context, with each serving a different purpose.

### Redux Toolkit

Redux manages all application data that changes over time or comes from an external source.

It includes three slices:

### Products

Handles:

* Product list
* Product details
* Categories
* Search
* Filters
* Sorting
* Loading states
* Error handling

Product data is fetched using `createAsyncThunk` from the Fake Store API.

### Cart

Responsible for:

* Adding products
* Removing products
* Updating quantities
* Clearing the cart
* Calculating totals
* Persisting cart data in Local Storage

### Authentication

Provides a simple mock authentication flow including:

* Login
* Logout
* Protected routes
* Persistent user session

---

### Theme Context

The Theme Context manages the application's light and dark mode.

It:

* Detects the user's preferred theme
* Saves the selected theme to Local Storage
* Applies Tailwind's dark mode across the application

Since theme management is simple UI state without server interaction, React Context is a better fit than Redux.

---

# API

NovaCart uses the public Fake Store API.

Endpoints:

```
GET /products

GET /products/:id

GET /products/categories
```

The API base URL can be configured using:

```
VITE_API_BASE_URL
```

No API key is required.

---

# Installation

Clone the repository and install the dependencies.

```bash
npm install
```

Copy the environment file.

```bash
cp .env.example .env
```

---

# Development

Start the development server.

```bash
npm run dev
```

---

# Running Tests

Run all tests.

```bash
npm run test
```

Watch mode.

```bash
npm run test:watch
```

Generate a coverage report.

```bash
npm run test:coverage
```

---

# Build

Create a production build.

```bash
npm run build
```

Preview the production build locally.

```bash
npm run preview
```

---

# Linting & Formatting

```bash
npm run lint

npm run format
```

---

# Demo Login

```
Email:
demo@novacart.com

Password:
password123
```

---

# Deployment

## Vercel

1. Push the repository to GitHub.
2. Import the repository into Vercel.
3. Select **Vite** as the framework.
4. Build command:

```bash
npm run build
```

5. Output directory:

```
dist
```

6. Optionally configure:

```
VITE_API_BASE_URL
```

---

## Netlify

1. Push the project to GitHub.
2. Create a new site from the repository.
3. Build command:

```bash
npm run build
```

4. Publish directory:

```
dist
```

5. Add the required environment variables if needed.

---

# Current Limitations

* Authentication is simulated and does not use a real backend.
* Product data depends entirely on the Fake Store API.
* Payments are not integrated.
* Checkout is simulated.

---

# Possible Improvements

Future versions could include:

* Wishlist support
* Product reviews and ratings
* Stripe payment integration
* Infinite scrolling or pagination
* Order history
* User profiles
* Admin dashboard
* Inventory management
* Real authentication with JWT
* Backend integration
* End-to-end testing with Playwright or Cypress

---

# License

This project is intended for learning and portfolio purposes. Feel free to modify and extend it for your own projects.
