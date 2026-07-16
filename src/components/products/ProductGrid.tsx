import { PackageSearch } from "lucide-react";
import type { Product } from "../../features/products/productTypes";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  onClearFilters: () => void;
}

export function ProductGrid({ products, onClearFilters }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="animate-fade-in flex flex-col items-center gap-4 rounded-xl2 border border-dashed border-nova-200 py-20 text-center dark:border-nova-800">
        <PackageSearch
          className="h-10 w-10 text-nova-300 dark:text-nova-600"
          aria-hidden="true"
        />
        <div>
          <p className="font-display text-lg font-semibold">No products match</p>
          <p className="mt-1 text-sm text-nova-500 dark:text-nova-400">
            Try a different search term or clear your filters.
          </p>
        </div>
        <button
          onClick={onClearFilters}
          className="rounded-full bg-nova-100 px-4 py-2 text-sm font-medium text-nova-900 hover:bg-nova-200 dark:bg-nova-800 dark:text-white dark:hover:bg-nova-700"
        >
          Clear filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
