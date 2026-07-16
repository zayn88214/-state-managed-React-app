import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-nova-50 text-nova-950 dark:bg-nova-950 dark:text-white">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-accent-500 focus:px-4 focus:py-2 focus:text-nova-950"
      >
        Skip to main content
      </a>
      <Header />
      <main
        id="main-content"
        className="mx-auto w-full max-w-8xl flex-1 px-4 py-8 sm:px-6 lg:px-8"
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
