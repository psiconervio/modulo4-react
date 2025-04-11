import { Routes, Route, BrowserRouter } from "react-router-dom";
import ItemDetail from "../pages/ItemDetail.jsx";
import ItemEdit from "../pages/ItemEdit.jsx";
import ItemCreate from "../pages/ItemCreate";
import ItemList from "../pages/ItemList.jsx";
import NotFound from "../pages/NotFound.jsx";
import Layout from "../layout.jsx";

const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<ItemList />} />
            <Route path="/items/:id" element={<ItemDetail />} />
            <Route path="/items/:id/edit" element={<ItemEdit />} />
            <Route path="/items/create" element={<ItemCreate />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
