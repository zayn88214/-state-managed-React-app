import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../components/auth/LoginForm";
import { useAppSelector } from "../app/hooks";
import { selectIsAuthenticated } from "../features/auth/authSlice";

export function LoginPage() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/account", { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <div className="mx-auto max-w-sm">
      <h1 className="text-center font-display text-2xl font-bold">Welcome back</h1>
      <p className="mt-2 text-center text-sm text-nova-500 dark:text-nova-400">
        Log in to view your account and check out.
      </p>
      <div className="mt-8 rounded-xl2 border border-nova-100 bg-white p-6 shadow-soft dark:border-nova-800 dark:bg-nova-900">
        <LoginForm />
      </div>
    </div>
  );
}
