import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProductGrid from '../components/ProductGrid'
// import CategoryFilter from '../components/CategoryFilter'
// import PriceFilter from '../components/PriceFilter'
import { useProducts } from '../context/ProductsContext'
import { PRODUCT_CATEGORIES } from '../data/mockData'
import { FaChevronRight, FaFilter, FaTimes } from 'react-icons/fa'

const HomePage = () => {
  const { products, isLoading } = useProducts()
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [maxPrice, setMaxPrice] = useState(2000)
  const [filteredProducts, setFilteredProducts] = useState([])
  const [showFilters, setShowFilters] = useState(false)
  
  useEffect(() => {
    if (products.length > 0) {
      let filtered = [...products]
      setFilteredProducts(filtered)
    }
  }, [products, selectedCategory, maxPrice])
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loading-spinner h-12 w-12"></div>
      </div>
    )
  }
  
  const featuredCategories = PRODUCT_CATEGORIES.slice(0, 6)
  
  return (
    <div className="max-w-7xl mx-auto relative">
      {/* Filter toggle button */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="fixed bottom-4 right-4 z-10 bg-fb-blue text-white p-4 rounded-full shadow-lg md:hidden"
      >
        {showFilters ? <FaTimes /> : <FaFilter />}
      </button>

      <div className="flex flex-col md:flex-row md:space-x-6">
        {/* Main content area */}
        <div className="flex-1">
          {/* Categories section - visible on mobile and tablet */}
          <div className="md:hidden mb-8">
            <h2 className="text-2xl font-bold">Categories</h2>
          </div>
          
          <div className="mb-12">
            <ProductGrid 
              products={filteredProducts.slice(0, 8)} 
              emptyMessage="No products match your filters. Try adjusting your search criteria."
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
// import { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import ProductGrid from '../components/ProductGrid'
// import CategoryFilter from '../components/CategoryFilter'
// import PriceFilter from '../components/PriceFilter'
// import { useProducts } from '../context/ProductsContext'
// import { PRODUCT_CATEGORIES } from '../data/mockData'
// import { FaChevronRight } from 'react-icons/fa'

// const HomePage = () => {
//   const { products, isLoading } = useProducts()
//   const [selectedCategory, setSelectedCategory] = useState(null)
//   const [maxPrice, setMaxPrice] = useState(2000)
//   const [filteredProducts, setFilteredProducts] = useState([])
  
//   // Apply filters and update products
//   useEffect(() => {
//     if (products.length > 0) {
//       let filtered = [...products]
      
//       if (selectedCategory) {
//         filtered = filtered.filter(product => product.category === selectedCategory)
//       }
      
//       filtered = filtered.filter(product => product.price <= maxPrice)
      
//       setFilteredProducts(filtered)
//     }
//   }, [products, selectedCategory, maxPrice])
  
//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="loading-spinner h-12 w-12"></div>
//       </div>
//     )
//   }
  
//   // Featured categories section
//   const featuredCategories = PRODUCT_CATEGORIES.slice(0, 6)
  
//   return (
//     <div className="max-w-7xl mx-auto">
//       <div className="flex flex-col md:flex-row md:space-x-6">
//         {/* Main content area */}
//         <div className="flex-1">
//           {/* Categories section - visible on mobile and tablet */}
//           {/* <div className="md:hidden mb-8">
//             <h2 className="text-2xl font-bold mb-4">Categories</h2>
//             <div className="flex overflow-x-auto pb-2 -mx-4 px-4 space-x-4">
//               {featuredCategories.map(category => (
//                 <Link 
//                   key={category}
//                   to={`/search?category=${encodeURIComponent(category)}`}
//                   className="flex-shrink-0 bg-white rounded-xl shadow-soft hover:shadow-hover p-4 w-32 h-32 flex flex-col items-center justify-center text-center transition-all duration-300"
//                 >
//                   <div className="text-fb-blue text-2xl mb-3">
//                     {category === 'Electronics' && '📱'}
//                     {category === 'Furniture' && '🪑'}
//                     {category === 'Clothing' && '👕'}
//                     {category === 'Sports & Outdoors' && '⚽'}
//                     {category === 'Vehicles' && '🚗'}
//                     {category === 'Musical Instruments' && '🎸'}
//                   </div>
//                   <span className="text-sm font-medium">{category}</span>
//                 </Link>
//               ))}
//               <Link 
//                 to="/search"
//                 className="flex-shrink-0 bg-white rounded-xl shadow-soft hover:shadow-hover p-4 w-32 h-32 flex flex-col items-center justify-center text-center transition-all duration-300"
//               >
//                 <div className="text-fb-blue text-2xl mb-3">
//                   <FaChevronRight />
//                 </div>
//                 <span className="text-sm font-medium">See All</span>
//               </Link>
//             </div>
//           </div> */}
          
//           {/* Mobile filters - expand/collapse */}
//           {/* <div className="md:hidden mb-6">
//             <button 
//               className="btn-secondary w-full flex justify-between items-center"
//               onClick={() => document.getElementById('mobile-filters').classList.toggle('hidden')}
//             >
//               <span>Filters</span>
//               <FaChevronRight className="transform rotate-90" />
//             </button>
            
//             <div id="mobile-filters" className="hidden bg-white rounded-xl shadow-soft p-6 mt-4">
//               <CategoryFilter 
//                 selectedCategory={selectedCategory} 
//                 onChange={setSelectedCategory} 
//               />
              
//               <PriceFilter 
//                 initialValue={maxPrice} 
//                 onChange={setMaxPrice} 
//               />
              
//               <button 
//                 onClick={() => {
//                   setSelectedCategory(null)
//                   setMaxPrice(2000)
//                 }}
//                 className="text-fb-blue text-sm hover:underline mt-4"
//               >
//                 Clear all filters
//               </button>
//             </div>
//           </div> */}
          
//           {/* Recently added section */}
//           {/* <div className="mb-12">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-2xl font-bold">Recently Added</h2>
//               <Link to="/search" className="text-fb-blue text-sm hover:underline">
//                 See All
//               </Link>
//             </div>
            
//             <ProductGrid 
//               products={filteredProducts.slice(0, 8)} 
//               emptyMessage="No products match your filters. Try adjusting your search criteria."
//             />
//           </div> */}
          
//           {/* Featured items section */}
//           <div className="mb-12">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-2xl font-bold">Articulos Destacados</h2>
//               {/* <Link to="/search" className="text-fb-blue text-sm hover:underline">
//                 See All
//               </Link> */}
//             </div>
            
//             <ProductGrid 
//               products={filteredProducts.slice(4, 8)} 
//               emptyMessage="No featured items available right now."
//             />
//           </div>
//         </div>
        
//         {/* Sidebar filters on desktop - moved to the right */}
//         {/* <div className="hidden md:block md:w-80">
//           <div className="bg-white rounded-xl shadow-soft p-6 sticky top-20">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-xl font-bold">Filters</h2>
//               <button 
//                 onClick={() => {
//                   setSelectedCategory(null)
//                   setMaxPrice(2000)
//                 }}
//                 className="text-fb-blue text-sm hover:underline"
//               >
//                 Clear all
//               </button>
//             </div>
            
//             <CategoryFilter 
//               selectedCategory={selectedCategory} 
//               onChange={setSelectedCategory} 
//             />
            
//             <PriceFilter 
//               initialValue={maxPrice} 
//               onChange={setMaxPrice} 
//             />
//           </div>
//         </div> */}
//       </div>
//     </div>
//   )
// }

// export default HomePage