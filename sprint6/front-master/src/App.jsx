import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import MessagesPage from "./pages/MessagesPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import ProfilePage from "./pages/ProfilePage";
import SavedItemsPage from "./pages/SavedItemsPage";
import CreateListingPage from "./pages/CreateListingPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./components/ProtectedRoute";
import EditProduct from "./components/EditProduct";
import RegisterPage from "./pages/RegisterPage";
import EditProfile from "./components/EditProfile";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="product/:id" element={<ProductDetailPage />} />
            <Route path="edit-product/:id" element={<EditProduct />} />
            <Route path="edit-profile/:id" element={<EditProfile />} />
            <Route path="search" element={<SearchResultsPage />} />
            {/* <Route path="messages" element={<MessagesPage />} /> */}
            <Route path="messages/:productId" element={<MessagesPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="saved" element={<SavedItemsPage />} />
            <Route path="create-listing" element={<CreateListingPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
