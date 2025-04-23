import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
const Header = ({ setIsModalFav }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const onOpenModalFav = () => {
    setIsModalFav(true);
  };
  return (
    <header
      className={
        theme === "dark"
          ? "bg-gray-800 text-white p-4"
          : "bg-gray-600 text-white p-4"
      }
    >
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl ml-8 font-bold ">Estadisticas De Personajes</h1>
        <div
          onClick={onOpenModalFav}
          className="mx-5 bg-green-700 text-white px-4 py-2"
        >
          <i className="bi bi-star-fill"></i>
        </div>
      </div>
    </header>
  );
};

export default Header;
