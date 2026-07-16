import { useEffect } from "react";
import { ArrowRight, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  fetchProducts,
  selectFilteredProducts,
  setSearchQuery,
  setSelectedCategory,
  setSortOption,
} from "../features/products/productsSlice";
import { ProductGrid } from "../components/products/ProductGrid";
import { ProductGridSkeleton } from "../components/common/Skeleton";
import { ErrorAlert } from "../components/common/ErrorAlert";
import { FilterBar } from "../components/products/FilterBar";
import { Button } from "../components/common/Button";

const trustPoints = [
  { icon: Truck, label: "Free shipping over $50" },
  { icon: ShieldCheck, label: "Secure, encrypted checkout" },
  { icon: Sparkles, label: "Curated, quality-checked picks" },
];

export function HomePage() {
  const dispatch = useAppDispatch();
  const { status, error, categories, selectedCategory, sortOption, searchQuery } =
    useAppSelector((state) => state.products);
  const filteredProducts = useAppSelector(selectFilteredProducts);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleClearFilters = () => {
    dispatch(setSearchQuery(""));
    dispatch(setSelectedCategory("all"));
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative mb-14 overflow-hidden rounded-xl3 bg-ink-gradient px-6 py-14 text-white sm:px-12 sm:py-20">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent-500/25 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-accent-400/10 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto flex max-w-2xl flex-col items-start gap-5 animate-fade-in">
          <span className="eyebrow rounded-full border border-white/15 bg-white/5 px-3 py-1 text-accent-300">
            New season, curated
          </span>
          <h1 className="font-display text-4xl font-extrabold leading-[1.1] sm:text-5xl">
            Everyday essentials,
            <br className="hidden sm:block" /> chosen with care.
          </h1>
          <p className="max-w-lg text-base leading-relaxed text-nova-200">
            Electronics, jewelry, and apparel &mdash; hand-picked for quality
            and priced fairly. No noise, just the pieces worth owning.
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <a href="#catalog">
              <Button size="lg">
                Shop the collection
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </a>
            <a href="#catalog">
              <Button variant="outline" size="lg" className="border-white/25 text-white hover:border-accent-400 hover:text-accent-300">
                Browse categories
              </Button>
            </a>
          </div>
          <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            {trustPoints.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-nova-300">
                <Icon className="h-4 w-4 text-accent-400" aria-hidden="true" />
                {label}
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div id="catalog" className="mb-8 scroll-mt-24">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">
          Discover the collection
        </h2>
        <p className="mt-2 max-w-xl text-nova-500 dark:text-nova-400">
          Curated everyday essentials, electronics, and accessories &mdash;
          picked for quality and priced fairly.
        </p>
        {searchQuery && (
          <p className="mt-3 text-sm text-nova-500 dark:text-nova-400">
            Showing results for{" "}
            <span className="font-semibold">&ldquo;{searchQuery}&rdquo;</span>
          </p>
        )}
      </div>

      {status === "loading" && <ProductGridSkeleton />}

      {status === "failed" && (
        <ErrorAlert
          message={error ?? "Unable to load products."}
          onRetry={() => dispatch(fetchProducts())}
        />
      )}

      {status === "succeeded" && (
        <>
          <FilterBar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={(category) => dispatch(setSelectedCategory(category))}
            sortOption={sortOption}
            onSortChange={(sort) => dispatch(setSortOption(sort))}
            resultCount={filteredProducts.length}
          />
          <ProductGrid products={filteredProducts} onClearFilters={handleClearFilters} />
        </>
      )}
    </div>
  );
}
