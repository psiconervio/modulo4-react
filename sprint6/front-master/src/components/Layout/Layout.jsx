import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'

const Layout = () => {
  const { isAuthenticated, user } = useAuth()
  const { theme } = useTheme()
  
  return (
    <div className={`flex flex-col m-0 min-w-[320px] min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <Navbar />
      
      <div className="flex flex-1">
        {user && (
          <aside className={`hidden md:block bg-gray-800 text-white h-full ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
            <Sidebar />
          </aside>
        )}
        
        <main className={`flex-1 ${user ? 'md:ml-2' : ''}`}>
          <div className="container mx-auto py-4 px-2">
            <Outlet />
          </div>
        </main>
      </div>
      
    </div>
  )
}

export default Layout