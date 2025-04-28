import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Footer from './Footer'
import { useAuth } from '../../context/AuthContext'

const Layout = () => {
  const { isAuthenticated } = useAuth()
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex flex-1 mt-24">
        {isAuthenticated && (
          <aside className="hidden md:block w-56 bg-white shadow-sm">
            <Sidebar />
          </aside>
        )}
        
        <main className={`flex-1 ${isAuthenticated ? 'md:ml-2' : ''}`}>
          <div className="container mx-auto py-4 px-4">
            <Outlet />
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  )
}

export default Layout