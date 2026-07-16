import type { SortOption } from "../../features/products/productTypes";
import { capitalize } from "../../utils/format";

interface FilterBarProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
  resultCount: number;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "default", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Top rated" },
  { value: "name", label: "Name: A to Z" },
];

export function FilterBar({
  categories,
  selectedCategory,
  onCategoryChange,
  sortOption,
  onSortChange,
  resultCount,
}: FilterBarProps) {
  return (
    <div className="glass-surface sticky top-16 z-20 mb-6 flex flex-col gap-4 rounded-xl2 border border-nova-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between dark:border-nova-800">
      <div
        className="flex flex-wrap items-center gap-2"
        role="group"
        aria-label="Filter by category"
      >
        <button
          onClick={() => onCategoryChange("all")}
          aria-pressed={selectedCategory === "all"}
          className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
            selectedCategory === "all"
              ? "bg-nova-950 text-white dark:bg-white dark:text-nova-950"
              : "bg-nova-100 text-nova-700 hover:bg-nova-200 dark:bg-nova-800 dark:text-nova-200 dark:hover:bg-nova-700"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            aria-pressed={selectedCategory === category}
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium capitalize transition-colors ${
              selectedCategory === category
                ? "bg-nova-950 text-white dark:bg-white dark:text-nova-950"
                : "bg-nova-100 text-nova-700 hover:bg-nova-200 dark:bg-nova-800 dark:text-nova-200 dark:hover:bg-nova-700"
            }`}
          >
            {capitalize(category)}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <span className="whitespace-nowrap text-sm text-nova-500 dark:text-nova-400">
          {resultCount} product{resultCount === 1 ? "" : "s"}
        </span>
        <label htmlFor="sort-select" className="sr-only">
          Sort products
        </label>
        <select
          id="sort-select"
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="rounded-full border border-nova-200 bg-white px-3 py-1.5 text-sm outline-none focus:border-accent-400 dark:border-nova-700 dark:bg-nova-900"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
