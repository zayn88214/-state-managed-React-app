import { AlertTriangle } from "lucide-react";
import { Button } from "./Button";

interface ErrorAlertProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorAlert({ message, onRetry }: ErrorAlertProps) {
  return (
    <div
      role="alert"
      className="animate-fade-in flex flex-col items-center gap-4 rounded-xl2 border border-red-200 bg-red-50 p-8 text-center dark:border-red-900/50 dark:bg-red-950/30"
    >
      <AlertTriangle className="h-8 w-8 text-red-500" aria-hidden="true" />
      <div>
        <p className="font-display text-lg font-semibold text-red-700 dark:text-red-300">
          Something went wrong
        </p>
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{message}</p>
      </div>
      {onRetry && (
        <Button variant="danger" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}
