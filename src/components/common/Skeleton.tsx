export function ProductCardSkeleton() {
  return (
    <div
      className="animate-fade-in overflow-hidden rounded-xl2 border border-nova-100 bg-white shadow-soft dark:border-nova-800 dark:bg-nova-900"
      aria-hidden="true"
    >
      <div className="skeleton h-48 w-full" />
      <div className="space-y-3 p-4">
        <div className="skeleton h-3 w-1/3 rounded" />
        <div className="skeleton h-4 w-4/5 rounded" />
        <div className="skeleton h-4 w-1/2 rounded" />
        <div className="skeleton h-9 w-full rounded-full" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      role="status"
      aria-label="Loading products"
    >
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div
      className="grid grid-cols-1 gap-8 md:grid-cols-2"
      role="status"
      aria-label="Loading product details"
    >
      <div className="skeleton aspect-square w-full rounded-xl2" />
      <div className="space-y-4">
        <div className="skeleton h-3 w-24 rounded" />
        <div className="skeleton h-8 w-3/4 rounded" />
        <div className="skeleton h-5 w-1/3 rounded" />
        <div className="skeleton h-24 w-full rounded" />
        <div className="skeleton h-11 w-40 rounded-full" />
      </div>
    </div>
  );
}
