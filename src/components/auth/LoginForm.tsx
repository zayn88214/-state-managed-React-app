import { useState, type FormEvent } from "react";
import { Eye, EyeOff, Info } from "lucide-react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { login, selectAuthStatus } from "../../features/auth/authSlice";
import { validateEmail, validatePassword } from "../../utils/validation";
import { Button } from "../common/Button";

interface FormErrors {
  email?: string;
  password?: string;
}

export function LoginForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const status = useAppSelector(selectAuthStatus);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formError, setFormError] = useState<string | null>(null);

  const isLoading = status === "loading";

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setFormError(null);

    const nextErrors: FormErrors = {
      email: validateEmail(email) ?? undefined,
      password: validatePassword(password) ?? undefined,
    };
    setErrors(nextErrors);
    if (nextErrors.email || nextErrors.password) return;

    const result = await dispatch(login({ email, password }));
    if (login.fulfilled.match(result)) {
      toast.success("Welcome back!");
      const redirectTo = (location.state as { from?: string } | null)?.from ?? "/account";
      navigate(redirectTo, { replace: true });
    } else {
      setFormError(result.payload ?? "Login failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
          Email address
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm outline-none focus:border-nova-400 dark:bg-nova-900 ${
            errors.email ? "border-red-400" : "border-nova-200 dark:border-nova-700"
          }`}
        />
        {errors.email && (
          <p id="email-error" role="alert" className="mt-1 text-xs text-red-600">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-medium">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? "password-error" : undefined}
            className={`w-full rounded-lg border bg-white px-3.5 py-2.5 pr-10 text-sm outline-none focus:border-nova-400 dark:bg-nova-900 ${
              errors.password ? "border-red-400" : "border-nova-200 dark:border-nova-700"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-nova-400 hover:bg-nova-100 dark:hover:bg-nova-800"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Eye className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
        {errors.password && (
          <p id="password-error" role="alert" className="mt-1 text-xs text-red-600">
            {errors.password}
          </p>
        )}
      </div>

      {formError && (
        <p role="alert" className="text-sm text-red-600">
          {formError}
        </p>
      )}

      <Button type="submit" isLoading={isLoading} className="w-full" size="lg">
        Log in
      </Button>

      <div className="flex items-start gap-2 rounded-lg bg-nova-50 p-3 text-xs text-nova-600 dark:bg-nova-900 dark:text-nova-300">
        <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        <p>
          Demo account &mdash; email <strong>demo@novacart.com</strong>, password{" "}
          <strong>password123</strong>
        </p>
      </div>
    </form>
  );
}
