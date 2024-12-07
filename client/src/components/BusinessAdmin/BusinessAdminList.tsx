
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function BusinessCategoryListTable() {
  const [categories, setCategories] = useState([]); // To store the fetched categories
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch data from backend when component mounts
  useEffect(() => {
    axios.get('http://localhost:4000/api/businessAdmin/getCategorylist')
      .then((response) => {
        console.log('response.data', response.data);
        
        setCategories(response.data); // Store fetched categories in state
        setLoading(false); // Update loading state
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
        setLoading(false); // Stop loading in case of error
      });
  }, []);

  // Show loading message until data is fetched
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-lg text-white">Loading categories...</span>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg space-y-6">
        <h2 className="text-4xl font-bold text-center text-gray-100 mb-6">Technical Categories</h2>
        {categories.length === 0 ? (
          <p className="text-center text-gray-300">No categories available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-gray-700 p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:bg-gray-600"
              >
                <Link
                  to={`/businessCategory/${category.id}`}
                  className="block text-xl font-semibold text-gray-100 mb-4 hover:text-indigo-400 transition-colors duration-300"
                >
                  {category.category}
                </Link>

                <h3 className="text-lg text-gray-300 font-medium">{category.category}</h3>
                {category.subCategory && (
                  <p className="text-sm text-gray-400 mt-2">Subcategory: {category.subCategory}</p>
                )}
                {category.columnMapping && (
                  <div className="mt-4">
                    <h4 className="text-sm text-gray-400 font-semibold">Column Mapping:</h4>
                    <ul className="text-sm text-gray-300 space-y-2 mt-2">
                      {Array.isArray(category.columnMapping) ? (
                        category.columnMapping.map((column, index) => {
                          // For each column object, iterate over its keys
                          return Object.keys(column).map((columnKey) => {
                            // Check if the value is an object and handle accordingly
                            const columnValue = column[columnKey];
                            return (
                              <li key={index + columnKey}>
                                <strong>{columnKey}:</strong> 
                                {typeof columnValue === 'object' ? (
                                  // If the value is an object, display its inner keys and values
                                  <ul className="ml-4 space-y-1">
                                    {Object.entries(columnValue).map(([nestedKey, nestedValue], idx) => (
                                      <li key={idx}>
                                        <strong>{nestedKey}:</strong> {nestedValue || 'No value'}
                                      </li>
                                    ))}
                                  </ul>
                                ) : (
                                  // If it's not an object, just display the value directly
                                  <span>{columnValue || 'No value'}</span>
                                )}
                              </li>
                            );
                          });
                        })
                      ) : (
                        <li>No column mappings available.</li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BusinessCategoryListTable;


