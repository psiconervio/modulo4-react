import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useProducts } from "../context/ProductsContext";
import ProductGrid from "../components/ProductGrid";

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const { products, isLoading } = useProducts();
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Obtener los parámetros de búsqueda
    const term = (searchParams.get("q") || "").trim().toLowerCase();
    const category = (searchParams.get("category") || "").trim().toLowerCase();

    // Filtrar productos por nombre y/o categoría
    setResults(
      products.filter((p) => {
        const matchesName = term
          ? p.name?.toLowerCase().includes(term)
          : true;

        const matchesCategory = category
          ? p.category?.toLowerCase() === category
          : true;

        return matchesName && matchesCategory;
      })
    );
  }, [products, searchParams]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  // Obtener parámetros de búsqueda para mostrar en la UI
  const term = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <FaSearch className="mr-2 text-gray-600" />
        {term || category
          ? `Resultados para "${term}" en categoría "${category}"`
          : `Todos los productos (${results.length})`}
      </h2>

      <ProductGrid
        products={results}
        emptyMessage={
          term || category
            ? `No se encontraron productos que coincidan con "${term}" en la categoría "${category}".`
            : "No hay productos disponibles."
        }
      />
    </div>
  );
};

export default SearchResultsPage;

// // src/pages/SearchResultsPage.jsx
// import { useState, useEffect } from 'react'
// import { useSearchParams } from 'react-router-dom'
// import { FaSearch } from 'react-icons/fa'  // opcional, sólo si quieres mostrar un ícono en el título
// import { useProducts } from '../context/ProductsContext'
// import ProductGrid from '../components/ProductGrid'

// const SearchResultsPage = () => {
//   const [searchParams] = useSearchParams()
//   const { products, isLoading } = useProducts()
//   const [results, setResults] = useState([])

//   useEffect(() => {
//     const term = (searchParams.get('q') || '').trim().toLowerCase()
//     if (term) {
//       setResults(
//         products.filter((p) =>
//           p.name?.toLowerCase().includes(term)
//         )
//       )
//     } else {
//       setResults(products)
//     }
//   }, [products, searchParams])

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
//       </div>
//     )
//   }

//   const term = searchParams.get('q') || ''

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4 flex items-center">
//         <FaSearch className="mr-2 text-gray-600" />
//         {term
//           ? `Resultados para "${term}"`
//           : `Todos los productos (${results.length})`}
//       </h2>

//       <ProductGrid
//         products={results}
//         emptyMessage={
//           term
//             ? `No se encontraron productos que coincidan con "${term}".`
//             : 'No hay productos disponibles.'
//         }
//       />
//     </div>
//   )
// }

// export default SearchResultsPage


// import { useState, useEffect } from 'react'
// import { useSearchParams } from 'react-router-dom'
// import ProductGrid from '../components/ProductGrid'
// import CategoryFilter from '../components/CategoryFilter'
// import PriceFilter from '../components/PriceFilter'
// import { useProducts } from '../context/ProductsContext'
// import { FaSearch } from 'react-icons/fa'

// const SearchResultsPage = () => {
//   const [searchParams, setSearchParams] = useSearchParams()
//   const { searchProducts, isLoading } = useProducts()
  
//   const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '')
//   const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || null)
//   const [maxPrice, setMaxPrice] = useState(parseInt(searchParams.get('maxPrice') || '2000', 10))
//   const [results, setResults] = useState([])
  
//   // Update filters from URL params on initial load
//   useEffect(() => {
//     setSearchTerm(searchParams.get('q') || '')
//     setSelectedCategory(searchParams.get('category') || null)
//     setMaxPrice(parseInt(searchParams.get('maxPrice') || '2000', 10))
//   }, [searchParams])
  
//   // Search products when filters change
//   useEffect(() => {
//     if (!isLoading) {
//       const filters = {}
//       if (selectedCategory) filters.category = selectedCategory
//       if (maxPrice) filters.maxPrice = maxPrice
      
//       const searchResults = searchProducts(searchTerm, filters)
//       setResults(searchResults)
//     }
//   }, [searchTerm, selectedCategory, maxPrice, isLoading, searchProducts])
  
//   // Update URL params when filters change
//   useEffect(() => {
//     const params = {}
//     if (searchTerm) params.q = searchTerm
//     if (selectedCategory) params.category = selectedCategory
//     if (maxPrice !== 2000) params.maxPrice = maxPrice.toString()
    
//     setSearchParams(params, { replace: true })
//   }, [searchTerm, selectedCategory, maxPrice, setSearchParams])
  
//   // const handleCategoryChange = (category) => {
//   //   setSelectedCategory(category)
//   // }
  
//   // const handlePriceChange = (price) => {
//   //   setMaxPrice(price)
//   // }
  
//   // const handleSearchSubmit = (e) => {
//   //   e.preventDefault()
//   //   // The search is already handled by the useEffect when searchTerm changes
//   // }
  
//   // const clearFilters = () => {
//   //   setSearchTerm('')
//   //   setSelectedCategory(null)
//   //   setMaxPrice(2000)
//   // }
  
//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fb-blue"></div>
//       </div>
//     )
//   }
  
//   return (
//     <div>
//       {/* <div className="mb-6">
//         <form onSubmit={handleSearchSubmit} className="relative max-w-lg mx-auto">
//           <input
//             type="text"
//             placeholder="Search Marketplace"
//             className="w-full bg-white text-black rounded-full py-2 pl-4 pr-10 input-field"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <button type="submit" className="absolute right-0 top-0 mt-2 mr-3 text-gray-500">
//             <FaSearch />
//           </button>
//         </form>
//       </div> */}
      
//       <div className="flex flex-col md:flex-row">
//         {/* Filters sidebar */}
//         {/* <div className="w-full md:w-64 md:mr-6 mb-6 md:mb-0">
//           <div className="bg-white rounded-lg shadow p-4">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="font-bold text-lg">Filters</h2>
//               <button 
//                 onClick={clearFilters}
//                 className="text-fb-blue text-sm hover:underline"
//               >
//                 Clear all
//               </button>
//             </div>
            
//             <CategoryFilter 
//               selectedCategory={selectedCategory} 
//               onChange={handleCategoryChange} 
//             />
            
//             <PriceFilter 
//               initialValue={maxPrice} 
//               onChange={handlePriceChange} 
//             />
//           </div>
//         </div> */}
        
//         {/* Search results */}
//         <div className="flex-1">
//           <div className=" rounded-lg shadow p-4">
//             <h2 className="font-bold text-lg mb-4">
//               {searchTerm ? `Results for "${searchTerm}"` : 'All Items'}
//               {selectedCategory && ` in ${selectedCategory}`}
//               {results.length > 0 && ` (${results.length} items)`}
//             </h2>
            
//             <ProductGrid 
//               products={results} 
//               emptyMessage={
//                 searchTerm 
//                   ? `No results found for "${searchTerm}". Try different keywords or filters.`
//                   : "No products match your filters."
//               }
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default SearchResultsPage