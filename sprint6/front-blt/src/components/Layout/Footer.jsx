import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-white border-t py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="font-bold text-lg mb-3">FBMarket</h3>
            <p className="text-gray-600 max-w-md">Buy and sell items with people in your community.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold mb-3">Marketplace</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-600 hover:text-fb-blue">Home</Link></li>
                <li><Link to="/search" className="text-gray-600 hover:text-fb-blue">Categories</Link></li>
                <li><Link to="/saved" className="text-gray-600 hover:text-fb-blue">Saved Items</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Account</h4>
              <ul className="space-y-2">
                <li><Link to="/profile" className="text-gray-600 hover:text-fb-blue">Your Listings</Link></li>
                <li><Link to="/messages" className="text-gray-600 hover:text-fb-blue">Messages</Link></li>
                <li><Link to="/create-listing" className="text-gray-600 hover:text-fb-blue">Sell an Item</Link></li>
              </ul>
            </div>
            
            <div className="col-span-2 md:col-span-1">
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-600 hover:text-fb-blue">Terms of Service</Link></li>
                <li><Link to="/" className="text-gray-600 hover:text-fb-blue">Privacy Policy</Link></li>
                <li><Link to="/" className="text-gray-600 hover:text-fb-blue">Cookies</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} FBMarket. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer