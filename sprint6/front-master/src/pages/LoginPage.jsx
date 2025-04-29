import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FaShoppingCart, FaExclamationCircle } from 'react-icons/fa'
import { MOCK_USERS } from '../data/mockData'

const LoginPage = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    
    // For the demo, we'll accept any email that matches a mock user
    const user = MOCK_USERS.find(user => user.email.toLowerCase() === email.toLowerCase())
    
    if (user && password) {
      const success = login(user)
      if (success) {
        navigate('/')
      } else {
        setError('Something went wrong. Please try again.')
      }
    } else {
      setError('Invalid email or password.')
    }
  }
  
  // For demo purposes, provide a quick login option
  const handleDemoLogin = (userId) => {
    const user = MOCK_USERS.find(user => user.id === userId)
    if (user) {
      login(user)
      navigate('/')
    }
  }
  
  return (
    <div className="min-h-screen bg-fb-gray flex flex-col justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center text-fb-blue text-2xl font-bold">
            <FaShoppingCart className="mr-2" />
            FBMarket
          </Link>
          <p className="text-gray-600 mt-2">Buy and sell items with people in your community</p>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 flex items-center">
            <FaExclamationCircle className="mr-2" />
            <span>{error}</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button
            type="submit"
            className="btn-primary w-full mb-4"
          >
            Log In
          </button>
        </form>
        
        <div className="text-center my-4">
          <span className="text-gray-500">or</span>
        </div>
        
        <div className="mb-4">
          <p className="text-center text-gray-700 mb-2">Quick login for demo:</p>
          <div className="grid grid-cols-2 gap-2">
            {MOCK_USERS.map(user => (
              <button
                key={user.id}
                onClick={() => handleDemoLogin(user.id)}
                className="flex items-center p-2 border rounded-md hover:bg-gray-50"
              >
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <span className="text-sm">{user.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage