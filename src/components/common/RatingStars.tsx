import { Star } from "lucide-react";

interface RatingStarsProps {
  rate: number;
  count: number;
}

export function RatingStars({ rate, count }: RatingStarsProps) {
  return (
    <div
      className="flex items-center gap-1 text-sm text-nova-600 dark:text-nova-300"
      aria-label={`Rated ${rate} out of 5 stars, based on ${count} reviews`}
    >
      <Star className="h-4 w-4 fill-accent-500 text-accent-500" aria-hidden="true" />
      <span className="font-medium">{rate.toFixed(1)}</span>
      <span className="text-nova-400">({count})</span>
    </div>
  );
}
