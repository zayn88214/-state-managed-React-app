import { Link } from "react-router-dom";
import { Compass } from "lucide-react";
import { Button } from "../components/common/Button";

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <Compass
        className="h-12 w-12 text-nova-300 dark:text-nova-600"
        aria-hidden="true"
      />
      <h1 className="font-display text-4xl font-bold">404</h1>
      <p className="text-nova-500 dark:text-nova-400">
        We couldn&apos;t find the page you were looking for.
      </p>
      <Link to="/">
        <Button>Back to shop</Button>
      </Link>
    </div>
  );
}
