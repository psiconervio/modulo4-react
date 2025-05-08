import ProductCard from "./ProductCard";
import { useTheme } from "../context/ThemeContext";

const ProductGrid = ({ products, title, emptyMessage }) => {
  const { theme } = useTheme();
  if (!products || products.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <p className="text-gray-500">{emptyMessage || "No products found"}</p>
      </div>
    );
  }

  return (
    <div>
      {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-50">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;

// import ProductCard from './ProductCard'

// const ProductGrid = ({ products, title, emptyMessage }) => {
//   if (!products || products.length === 0) {
//     return (
//       <div className="bg-white rounded-lg shadow p-6 text-center">
//         <p className="text-gray-500">{emptyMessage || 'No products found'}</p>
//       </div>
//     )
//   }

//   return (
//     <div>
//       {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {products.map(product => (
//           <ProductCard key={product.id} product={product} />
//         ))}
//       </div>
//     </div>
//   )
// }

// export default ProductGrid
