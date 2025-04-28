import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductGrid from '../components/ProductGrid'
import CategoryFilter from '../components/CategoryFilter'
import PriceFilter from '../components/PriceFilter'
import { useProducts } from '../context/ProductsContext'
import { FaSearch, FaFilter, FaTimes } from 'react-icons/fa'

const SearchResultsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { searchProducts, isLoading } = useProducts()
  
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || null)
  const [maxPrice, setMaxPrice] = useState(parseInt(searchParams.get('maxPrice') || '2000', 10))
  const [results, setResults] = useState([])
  const [showFilters, setShowFilters] = useState(false)
  
  // Update filters from URL params on initial load
  useEffect(() => {
    setSearchTerm(searchParams.get('q') || '')
    setSelectedCategory(searchParams.get('category') || null)
    setMaxPrice(parseInt(searchParams.get('maxPrice') || '2000', 10))
  }, [searchParams])
  
  // Search products when filters change
  useEffect(() => {
    if (!isLoading) {
      const filters = {}
      if (selectedCategory) filters.category = selectedCategory
      if (maxPrice) filters.maxPrice = maxPrice
      
      const searchResults = searchProducts(searchTerm, filters)
      setResults(searchResults)
    }
  }, [searchTerm, selectedCategory, maxPrice, isLoading, searchProducts])
  
  // Update URL params when filters change
  useEffect(() => {
    const params = {}
    if (searchTerm) params.q = searchTerm
    if (selectedCategory) params.category = selectedCategory
    if (maxPrice !== 2000) params.maxPrice = maxPrice.toString()
    
    setSearchParams(params, { replace: true })
  }, [searchTerm, selectedCategory, maxPrice, setSearchParams])
  
  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
  }
  
  const handlePriceChange = (price) => {
    setMaxPrice(price)
  }
  
  const handleSearchSubmit = (e) => {
    e.preventDefault()
    // The search is already handled by the useEffect when searchTerm changes
  }
  
  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategory(null)
    setMaxPrice(2000)
  }
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fb-blue"></div>
      </div>
    )
  }
  
  return (
    <div>
      {/* Filter toggle button */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="fixed bottom-4 right-4 z-10 bg-fb-blue text-white p-4 rounded-full shadow-lg md:hidden"
      >
        {showFilters ? <FaTimes /> : <FaFilter />}
      </button>

      <div className="mb-6">
        <form onSubmit={handleSearchSubmit} className="relative max-w-lg mx-auto">
          <input
            type="text"
            placeholder="Search Marketplace"
            className="w-full bg-white text-black rounded-full py-2 pl-4 pr-10 input-field"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="absolute right-0 top-0 mt-2 mr-3 text-gray-500">
            <FaSearch />
          </button>
        </form>
      </div>
      
      <div className="flex flex-col md:flex-row relative">
        {/* Filters sidebar */}
        <div className={`
          fixed inset-y-0 right-0 w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-20
          md:relative md:transform-none md:shadow-none md:w-64 md:mr-6 md:block
          ${showFilters ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
        `}>
          <div className="bg-white rounded-lg shadow p-4 sticky top-20">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg">Filters</h2>
              <button 
                onClick={clearFilters}
                className="text-fb-blue text-sm hover:underline"
              >
                Clear all
              </button>
            </div>
            
            <CategoryFilter 
              selectedCategory={selectedCategory} 
              onChange={handleCategoryChange} 
            />
            
            <PriceFilter 
              initialValue={maxPrice} 
              onChange={handlePriceChange} 
            />
          </div>
        </div>
        
        {/* Search results */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="font-bold text-lg mb-4">
              {searchTerm ? `Results for "${searchTerm}"` : 'All Items'}
              {selectedCategory && ` in ${selectedCategory}`}
              {results.length > 0 && ` (${results.length} items)`}
            </h2>
            
            <ProductGrid 
              products={results} 
              emptyMessage={
                searchTerm 
                  ? `No results found for "${searchTerm}". Try different keywords or filters.`
                  : "No products match your filters."
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchResultsPage