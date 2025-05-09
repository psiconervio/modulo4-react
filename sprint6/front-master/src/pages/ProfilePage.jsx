import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useProducts } from "../context/ProductsContext";
import ProductGrid from "../components/ProductGrid";
import { FaTrash, FaShoppingCart, FaEdit, FaPlusCircle } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import { getAllUsers, deleteuser } from "../data/apis";
import { can } from "../utils/permissions";

const ProfilePage = () => {
  const { theme } = useTheme();
  const {  user } = useAuth();
  const { products, isLoading } = useProducts();

  const [userProducts, setUserProducts] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  // Filtrar productos del usuario actual y cargar usuarios si tiene permiso
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        setAllUsers(response.data);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
      
    };

    if (!isLoading && products.length > 0 && user) {
      // Filtrar solo productos con seller definido y que coincida con el usuario
      const listings = products.filter(
        (product) => product?.seller?.username === user.username
      );
      setUserProducts(listings);

      // Si tiene permiso, cargar lista de usuarios
      if (can(user, "all:permiso")) {
        fetchUsers();
      }
    }
  }, [products, user, isLoading]);

const handleDeleteUser = async (userId) => {
  try {
    await deleteuser(userId);
    const response = await getAllUsers();
    setAllUsers(response.data);
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
  }
};

  if (isLoading || !user) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fb-blue"></div>
      </div>
    );
  }

  return (
    <div>
      <div
        className={`rounded-lg shadow-md p-6 mb-6 ${
          theme === "dark" ? "bg-slate-800" : "bg-slate-500"
        }`}
      >
        <div className="flex flex-col sm:flex-row items-center">
          <img
            src={user.avatar || "https://via.placeholder.com/150"}
            alt={user.username}
            className="w-24 h-24 rounded-full mb-4 sm:mb-0 sm:mr-6"
          />
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold">{user.username}</h1>
            <p className="text-gray-600">{user.email}</p>
            <div className="mt-3 flex justify-center sm:justify-start space-x-3">
              <Link to={`/edit-profile/${user._id}`}>
                <button className="btn-secondary flex items-center">
                  <FaEdit className="mr-2" /> Edit Profile
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Sección de usuarios: solo si tiene permiso */}
        {can(user, "all:permiso") && (
          <div>
            <details className="mt-6">
              <summary className="cursor-pointer text-lg font-bold text-fb-blue">
                Ver Usuarios ({allUsers.length})
              </summary>
              <div className="mt-4">
                {allUsers.length === 0 ? (
                  <p className="text-gray-600">No hay usuarios disponibles.</p>
                ) : (
                  <ul className="space-y-4">
                    {allUsers.map((u) => (
                      <li
                        key={u._id}
                        className="flex justify-between items-center bg-gray-600 p-4 rounded-lg shadow-md"
                      >
                        <div>
                          <p className="font-bold">{u.username}</p>
                          <p className="text-white">{u.email}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            className="bg-red-500 text-white px-4 py-2 rounded-lg"
                            onClick={() => handleDeleteUser(u._id)}
                          >
                            <FaTrash />
                          </button>
                          <Link to={`/edit-profile/${u._id}`}>
                            <button className="btn-secondary flex items-center">
                              <FaEdit className="mr-2" /> Edit Profile
                            </button>
                          </Link>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </details>
          </div>
        )}
      </div>

      {/* Sección de productos del usuario */}
      <div
        className={`rounded-lg shadow-md p-6 ${
          theme === "dark" ? "bg-slate-700" : "bg-slate-400"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Tu lista de Productos</h2>
          <Link to="/create-listing" className="btn-primary flex items-center">
            <FaPlusCircle className="mr-2" /> Nueva Publicacion
          </Link>
        </div>
        {userProducts.length === 0 ? (
          <div className="text-center py-10">
            <div className="text-fb-blue text-5xl mb-4">
              <FaShoppingCart />
            </div>
            <h3 className="text-xl font-bold mb-2">Sin productos</h3>
            <p className="text-gray-600 mb-6">
              Empieza a vender artículos a personas de tu comunidad.
            </p>
            <Link to="/create-listing" className="btn-primary">
              Crear tu primera publicación
            </Link>
          </div>
        ) : (
          <ProductGrid
            products={userProducts}
            emptyMessage="No has creado ninguna publicación aún."
          />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;

// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { useProducts } from "../context/ProductsContext";
// import ProductGrid from "../components/ProductGrid";
// import { FaUser, FaShoppingCart, FaEdit, FaPlusCircle } from "react-icons/fa";
// import { useTheme } from "../context/ThemeContext";
// import { getAllUsers, deleteuser } from "../data/apis";
// import { can } from "../utils/permissions";

// const ProfilePage = () => {
//   const { theme } = useTheme();
//   const { isAhutenticated, user } = useAuth();
//   const { products, isLoading } = useProducts();
//   const [userProducts, setUserProducts] = useState([]);
//   const [allusers, setAllUsers] = useState([]);

//   // useEffect(() => {
//   //   // Función para obtener todos los usuarios
//   //   const buscarUsuarios = async () => {
//   //     try {
//   //       const response = await getAllUsers();
//   //       console.log("allusers", response.data);
//   //       setAllUsers(response.data);
//   //     } catch (error) {
//   //       console.error("Error al obtener usuarios:", error);
//   //     }
//   //   };

//   //   if (!isLoading && products.length > 0 && user) {
//   //     // Filtrar productos del usuario actual
//   //     const userListings = products.filter(
//   //       (product) => product.seller.username === user.username
//   //     );
//   //     console.log("lista", userListings);
//   //     setUserProducts(userListings);

//   //     if (user && can(user, "all:permiso")) {
//   //       buscarUsuarios();
//   //     }
//   //   }
//   // }, [products, user, isLoading]); // Quitamos allusers del array de dependencias
//   useEffect(() => {
//     const buscarUsuarios = async () => {
//       try {
//         const response = await getAllUsers();
//         console.log("allusers", response.data);
//         setAllUsers(response.data);
//       } catch (error) {
//         console.error("Error al obtener usuarios:", error);
//       }
//     };

//     if (!isLoading && products.length > 0 && user) {
//       const userListings = products.filter(
//         (product) =>
//           product?.seller?.username && product.seller.username === user.username
//       );

//       console.log("lista", userListings);
//       setUserProducts(userListings);

//       if (can(user, "all:permiso")) {
//         buscarUsuarios();
//       }
//     }
//   }, [products, user, isLoading]);
//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fb-blue"></div>
//       </div>
//     );
//   }
//   return (
//     <div>
//       <div
//         className={`rounded-lg shadow-md p-6 mb-6 ${
//           theme === "dark" ? "bg-slate-800" : "bg-slate-500"
//         }`}
//       >
//         <div className="flex flex-col sm:flex-row items-center">
//           <img className="w-24 h-24 rounded-full mb-4 sm:mb-0 sm:mr-6" />
//           <div className="text-center sm:text-left">
//             <h1 className="text-2xl font-bold">{user.username}</h1>
//             <p className="text-gray-600">{user.email}</p>
//             <div className="mt-3 flex justify-center sm:justify-start space-x-3">
//               <Link to={`/edit-profile/${user._id}`}>
//                 <button className="btn-secondary flex items-center">
//                   <FaEdit className="mr-2" /> Edit Profile
//                 </button>
//               </Link>
//             </div>
//           </div>
//         </div>
//         <div>
//           <details className="mt-6">
//             <summary className="cursor-pointer text-lg font-bold text-fb-blue">
//               Ver Usuarios ({allusers.length})
//             </summary>
//             <div className="mt-4">
//               {allusers.length === 0 ? (
//                 <p className="text-gray-600">No hay usuarios disponibles.</p>
//               ) : (
//                 <ul className="space-y-4">
//                   {allusers.map((user) => (
//                     <li
//                       key={user._id}
//                       className="flex justify-between items-center bg-gray-600 p-4 rounded-lg shadow-md"
//                     >
//                       <div>
//                         <p className="font-bold">{user.username}</p>
//                         <p className="text-white">{user.email}</p>
//                       </div>
//                       <button
//                         className="bg-red-500 text-white px-4 py-2 rounded-lg"
//                         onClick={() => deleteuser(user._id)}
//                       >
//                         Borrar
//                       </button>
//                       <Link to={`/edit-profile/${user._id}`}>
//                         <button className="btn-secondary flex items-center">
//                           <FaEdit className="mr-2" /> Edit Profile
//                         </button>
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>
//           </details>
//         </div>
//       </div>
//       <div
//         className={`rounded-lg shadow-md p-6 ${
//           theme === "dark" ? "bg-slate-700" : "bg-slate-400"
//         }`}
//       >
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-xl font-bold">Tu lista de Productos</h2>
//           <Link to="/create-listing" className="btn-primary flex items-center">
//             <FaPlusCircle className="mr-2" /> Nueva Publicacion
//           </Link>
//         </div>
//         {userProducts.length === 0 ? (
//           <div className="text-center py-10">
//             <div className="text-fb-blue text-5xl mb-4">
//               <FaShoppingCart />
//             </div>
//             <h3 className="text-xl font-bold mb-2">Sin productos</h3>
//             <p className="text-gray-600 mb-6">
//               Start selling items to people in your community.
//             </p>
//             <Link to="/create-listing" className="btn-primary">
//               Create Your First Listing
//             </Link>
//           </div>
//         ) : (
//           <ProductGrid
//             products={userProducts}
//             emptyMessage="You haven't created any listings yet."
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;
