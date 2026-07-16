import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useTheme } from "../context/ThemeContext";
import { renderWithProviders } from "./test-utils";

function ThemeProbe() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme-value">{theme}</span>
      <button onClick={toggleTheme}>Toggle theme</button>
    </div>
  );
}

describe("ThemeContext", () => {
  it("defaults to light theme and toggles to dark on demand", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ThemeProbe />);

    expect(screen.getByTestId("theme-value")).toHaveTextContent("light");

    await user.click(screen.getByRole("button", { name: /toggle theme/i }));
    expect(screen.getByTestId("theme-value")).toHaveTextContent("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);

    await user.click(screen.getByRole("button", { name: /toggle theme/i }));
    expect(screen.getByTestId("theme-value")).toHaveTextContent("light");
  });

  it("persists the chosen theme to localStorage", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ThemeProbe />);

    await user.click(screen.getByRole("button", { name: /toggle theme/i }));
    expect(localStorage.getItem("novacart:theme")).toBe("dark");
  });
});
