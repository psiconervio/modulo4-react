import { Link } from 'react-router-dom'
import { FaExclamationTriangle, FaHome } from 'react-icons/fa'

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <FaExclamationTriangle className="text-fb-blue text-5xl mb-4" />
      <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        The page you're looking for doesn't exist or has been removed.
      </p>
      <Link to="/" className="btn-primary flex items-center">
        <FaHome className="mr-2" /> Back to Marketplace
      </Link>
    </div>
  )
}

export default NotFoundPage