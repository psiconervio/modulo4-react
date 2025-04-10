import { Routes, Route, BrowserRouter } from "react-router-dom";
import ItemDetail from "../pages/ItemDetail.jsx";
import ItemEdit from "../pages/ItemEdit.jsx";
import ItemCreate from "../pages/ItemCreate";
import ItemList from "../pages/ItemList.jsx";
import NotFound from "../pages/NotFound.jsx";
import  App  from "../App";

const AppRouter = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        {/* Ruta principal que muestra la lista de ítems */}

        <Route path="/detail" element={<ItemDetail />} />
        {/* Ruta para mostrar los detalles de un ítem */}
        <Route path="/itemlist" element={<ItemList />} />
        {/* Ruta para mostrar los detalles de un ítem */}

        <Route path="/edit" element={<ItemEdit />} />
        {/* Ruta para editar un ítem */}

        <Route path="/create" element={<ItemCreate />} />
        {/* Ruta para crear un nuevo ítem */}

        <Route path="*" element={<NotFound />} />
        {/* Ruta comodín para manejar páginas no encontradas */}
      </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
