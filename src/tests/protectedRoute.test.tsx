import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "../components/auth/ProtectedRoute";
import { renderWithProviders } from "./test-utils";

function ProtectedProbe() {
  return (
    <Routes>
      <Route path="/login" element={<div>Login page</div>} />
      <Route
        path="/account"
        element={
          <ProtectedRoute>
            <div>Account page</div>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

describe("ProtectedRoute", () => {
  it("redirects unauthenticated users to the login page", () => {
    renderWithProviders(<ProtectedProbe />, { route: "/account" });
    expect(screen.getByText(/login page/i)).toBeInTheDocument();
  });
});
