import { PRODUCT_CATEGORIES } from '../data/mockData';

const CategoryFilter = ({ selectedCategory, onChange }) => {
  return (
    <div className="mb-8 hidden sm:block"> {/* Ocultar en pantallas pequeñas */}
      <h3 className="font-medium mb-4">Categories</h3>
      <div className="flex flex-col space-y-2">
        <button
          onClick={() => onChange(null)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            !selectedCategory 
              ? 'bg-fb-blue text-white shadow-soft' 
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
        >
          All Categories
        </button>
        
        {PRODUCT_CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => onChange(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              selectedCategory === category 
                ? 'bg-fb-blue text-white shadow-soft' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;