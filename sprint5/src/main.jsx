import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { ItemProvider } from "./context/ItemContext.jsx";
import AppRouter from "./router/AppRouter";
import { PersonajeProvider } from "./context/CharacterContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <CartProvider>
        <PersonajeProvider>
          <ItemProvider>
            <AppRouter />
          </ItemProvider>
        </PersonajeProvider>
      </CartProvider>
    </ThemeProvider>
  </StrictMode>
);
