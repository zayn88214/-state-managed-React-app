import { describe, expect, it } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "../components/auth/LoginForm";
import { renderWithProviders } from "./test-utils";

describe("LoginForm", () => {
  it("shows inline validation errors for empty fields", async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginForm />);

    await user.click(screen.getByRole("button", { name: /log in/i }));

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
  });

  it("shows an error for an invalid email format", async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginForm />);

    await user.type(screen.getByLabelText(/email address/i), "not-an-email");
    await user.type(screen.getByLabelText(/^password$/i), "password123");
    await user.click(screen.getByRole("button", { name: /log in/i }));

    expect(await screen.findByText(/enter a valid email/i)).toBeInTheDocument();
  });

  it("logs in successfully with the demo credentials", async () => {
    const user = userEvent.setup();
    const { store } = renderWithProviders(<LoginForm />, { route: "/login" });

    await user.type(screen.getByLabelText(/email address/i), "demo@novacart.com");
    await user.type(screen.getByLabelText(/^password$/i), "password123");
    await user.click(screen.getByRole("button", { name: /log in/i }));

    await waitFor(() => expect(store.getState().auth.user).not.toBeNull(), {
      timeout: 2000,
    });
  });
});
