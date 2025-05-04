import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductGrid from '../components/ProductGrid'
import { useProducts } from '../context/ProductsContext'
import { FaBookmark } from 'react-icons/fa'

const SavedItemsPage = () => {
  const { products, savedItems, isLoading } = useProducts()
  const [savedProducts, setSavedProducts] = useState([])
  useEffect(() => {
    if (!isLoading && products.length > 0) {
      // 1) Normaliza savedItems a un array de strings (IDs)
      const savedIds = savedItems.map(item =>
        item && typeof item === 'object'
          ? item._id        // extrae _id del objeto
          : item            // ya era string
      );
      console.log("Normalized savedIds:", savedIds);
  
      // 2) Filtra tus products por esos IDs
      const saved = products.filter(product =>
        // Cámbia product._id por product.id si ese es tu campo
        savedIds.includes(product._id)
      );
      console.log("Filtered saved products:", saved);
  
      setSavedProducts(saved);
    }
  }, [products, savedItems, isLoading]);
    
  // useEffect(() => {
  //   if (!isLoading && products.length > 0) {
  //     console.log("Products:", products);
  //     console.log("Saved Items:", savedItems);
  
  //     // const saved = products.filter(product => savedItems.includes(product.id))
  //     const saved = products.filter(product => savedItems.includes(String(product.id)));
  //     console.log('save', saved)
  //     setSavedProducts(saved)
  //   }
  // }, [products, savedItems, isLoading])
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fb-blue"></div>
      </div>
    )
  }
  
  if (savedProducts.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="text-fb-blue text-6xl mb-4">
          <FaBookmark />
        </div>
        <h2 className="text-2xl font-bold mb-2">No saved items yet</h2>
        <p className="text-gray-600 mb-6">
          Save items you're interested in to view them later.
        </p>
        <Link to="/" className="btn-primary inline-block">
          Browse Marketplace
        </Link>
      </div>
    )
  }
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Productos Guardados</h1>
      <ProductGrid 
        products={savedProducts} 
        emptyMessage="You haven't saved any items yet."
      />
    </div>
  )
}

export default SavedItemsPage