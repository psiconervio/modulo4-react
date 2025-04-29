import { useState, useEffect } from 'react'

const PriceFilter = ({ initialValue, onChange }) => {
  const [maxPrice, setMaxPrice] = useState(initialValue || 1000)
  
  useEffect(() => {
    if (initialValue !== undefined) {
      setMaxPrice(initialValue)
    }
  }, [initialValue])
  
  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10)
    setMaxPrice(value)
  }
  
  const handleMouseUp = () => {
    onChange(maxPrice)
  }
  
  return (
    <div className="mb-8">
      <h3 className="font-medium mb-4">Price Range</h3>
      <div className="space-y-4">
        <input
          type="range"
          min="0"
          max="2000"
          step="50"
          value={maxPrice}
          onChange={handleChange}
          onMouseUp={handleMouseUp}
          onTouchEnd={handleMouseUp}
          className="w-full accent-fb-blue"
        />
        <div className="flex justify-between items-center">
          <div className="bg-gray-100 rounded-lg px-4 py-2">
            <span className="text-sm text-gray-600">Min</span>
            <p className="font-medium">$0</p>
          </div>
          <div className="bg-gray-100 rounded-lg px-4 py-2">
            <span className="text-sm text-gray-600">Max</span>
            <p className="font-medium">${maxPrice}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PriceFilter