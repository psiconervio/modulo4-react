import { Routes, Route, BrowserRouter } from "react-router-dom";
import ItemDetail from "../pages/ItemDetail";
import ItemEdit from "../pages/ItemEdit";
import ItemCreate from "../pages/ItemCreate";
import NotFound from "../pages/NotFound";
import Layout from "../layout";
import ItemListLIST from "../pages/ItemListLIST";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "../router/ProtectedRoute";
import Unauthorized from "../pages/Unauthorized";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Rutas públicas */}
          <Route index element={<ItemListLIST />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="unauthorized" element={<Unauthorized />} />

          {/* Rutas protegidas por permisos */}
          <Route
            element={
              <ProtectedRoute allowedPermissions={["create:superheros"]} />
            }
          >
            <Route path="/items/create" element={<ItemCreate />} />
          </Route>

          <Route
            element={
              <ProtectedRoute allowedPermissions={["update:superheros"]} />
            }
          >
            <Route path="/items/:id/edit" element={<ItemEdit />} />
          </Route>

          <Route
            element={
              <ProtectedRoute allowedPermissions={["read:superheros"]} />
            }
          >
            <Route path="/items/:id" element={<ItemDetail />} />
          </Route>

          {/* Ruta para 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
// import { Routes, Route, BrowserRouter } from "react-router-dom";
// import ItemDetail from "../pages/ItemDetail.jsx";
// import ItemEdit from "../pages/ItemEdit.jsx";
// import ItemCreate from "../pages/ItemCreate";
// import NotFound from "../pages/NotFound.jsx";
// import Layout from "../layout.jsx";
// import ItemListLIST from "../pages/ItemListLIST.jsx";
// import { useItem } from "../context/ItemContext.jsx";
// import Login from "../pages/Login.jsx";
// import Register from "../pages/Register.jsx";

// const AppRouter = () => {
//   return (
//     <>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Layout />}>
//             {/* <Route index element={<ItemList />} /> */}
//             <Route index element={<ItemListLIST />} />
//             <Route path="/items/:id" element={<ItemDetail />} />
//             <Route path="/items/:id/edit" element={<ItemEdit />} />
//             <Route path="/items/create" element={<ItemCreate />} />
//             <Route path="login" element={<Login />} />
//             <Route path="register" element={<Register />} />
//             <Route path="*" element={<NotFound />} />
//           </Route>
//         </Routes>
//       </BrowserRouter>
//     </>
//   );
// };

// export default AppRouter;
