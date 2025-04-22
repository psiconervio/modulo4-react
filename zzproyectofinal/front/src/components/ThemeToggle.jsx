import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button className="text-2xl cursor-pointer" onClick={toggleTheme}>
     {theme === "light" ? <i class="bi bi-toggle-off"></i> : <i class="bi bi-toggle-on"></i>}
    </button>
  );
};

export default ThemeToggle;