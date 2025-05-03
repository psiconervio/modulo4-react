// import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";


// const ProtectedRoute = ({children}) => {
//   const { user, isLoading } = useAuth();

//   // Show loading state while checking authentication
//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-40">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fb-blue"></div>
//       </div>
//     );
//   }

//   // If not authenticated, redirect to login
//   return user? children : <Navigate to="/login" replace />;
// };

// export default ProtectedRoute;
// //codigo original
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth()

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fb-blue"></div>
      </div>
    )
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // If authenticated, render the child routes
  return <Outlet />
}

export default ProtectedRoute
