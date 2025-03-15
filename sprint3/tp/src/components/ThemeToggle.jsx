import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme}>
      Modo {theme === "light" ? "oscuro" : "|claro"}
    </button>
  );
};

export default ThemeToggle;