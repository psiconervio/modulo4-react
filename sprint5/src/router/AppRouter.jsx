import { Routes, Route } from "react-router-dom";
import ItemDetail from "../pages/ItemDetail.jsx";
import ItemEdit from "../pages/ItemEdit.jsx";
import ItemCreate from "../pages/ItemCreate.jsx";
import ItemList from "../pages/ItemList.jsx";
import NotFound from "../pages/NotFound.jsx";

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ItemDetail />} />
        <Route path="/" element={<ItemEdit />} />
        <Route path="/" element={<ItemList />} />
        <Route path="/" element={<ItemCreate />} />
        <Route path="/" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRouter;
