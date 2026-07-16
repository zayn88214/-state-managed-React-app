import { Toaster } from "react-hot-toast";
import { AppRoutes } from "./routes/AppRoutes";
import { useTheme } from "./context/ThemeContext";

export default function App() {
  const { theme } = useTheme();

  return (
    <>
      <AppRoutes />
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: theme === "dark" ? "#242019" : "#ffffff",
            color: theme === "dark" ? "#FAFAFA" : "#171310",
            borderRadius: "12px",
            fontSize: "14px",
            boxShadow: "0 6px 24px rgba(11, 10, 8, 0.12)",
          },
        }}
      />
    </>
  );
}
