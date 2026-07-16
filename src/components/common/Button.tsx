import { forwardRef, type ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-gold-gradient text-nova-950 shadow-glow hover:brightness-[1.04] hover:shadow-floating",
  secondary:
    "bg-nova-100 text-nova-900 hover:bg-nova-200 dark:bg-nova-800 dark:text-white dark:hover:bg-nova-700",
  outline:
    "border border-nova-300 bg-transparent text-nova-900 hover:border-accent-500 hover:text-accent-700 dark:border-nova-700 dark:text-nova-100 dark:hover:border-accent-400 dark:hover:text-accent-300",
  ghost:
    "bg-transparent text-nova-700 hover:bg-nova-100 dark:text-nova-100 dark:hover:bg-nova-800",
  danger: "bg-red-600 text-white hover:bg-red-700",
};

const sizeClasses: Record<Size, string> = {
  sm: "text-sm px-3 py-1.5 gap-1.5",
  md: "text-sm px-4 py-2.5 gap-2",
  lg: "text-base px-6 py-3 gap-2",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      className = "",
      children,
      ...rest
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`inline-flex items-center justify-center rounded-full font-semibold transition-all duration-200 ease-out disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.98] ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...rest}
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
