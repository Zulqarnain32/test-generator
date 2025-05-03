import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CookiesProvider } from "react-cookie";
import { AuthProvider } from "./global/AuthContext.jsx";
createRoot(document.getElementById("root")).render(
    <CookiesProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </CookiesProvider>
);
