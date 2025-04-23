import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { ItemProvider } from "./context/ItemContext.jsx";
import AppRouter from "./router/AppRouter";
import { PersonajeProvider } from "./context/CharacterContext.jsx";
import AuthProvider from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <CartProvider>
          <PersonajeProvider>
            <ItemProvider>
              <AppRouter />
            </ItemProvider>
          </PersonajeProvider>
        </CartProvider>
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);
