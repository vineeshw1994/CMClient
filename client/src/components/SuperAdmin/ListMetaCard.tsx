import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ListMetaCard = () => {
  const [categories, setCategories] = useState([]); // Store categories fetched from localStorage

  useEffect(() => {
    // Fetch categories from localStorage
    const fetchCategoriesFromLocalStorage = () => {
      const keys = Object.keys(localStorage); // Get all keys from localStorage
      console.log("Keys from localStorage:", keys); // Log keys from localStorage for debugging

      const storedCategories = keys
        .filter((key) => localStorage.getItem(key)) // Check if category exists in localStorage
        .map((key) => {
          const categoryData = JSON.parse(localStorage.getItem(key)); // Parse the stored category data
          console.log("Category data for key:", key, categoryData); // Log each category's data

          return {
            id: key, // Use the category name as the unique ID
            category: categoryData.category,
            subCategory: categoryData.subcategory,
            columnMapping: categoryData.columnMapping,
          };
        });

      console.log("Stored categories:", storedCategories); // Log the final array of categories

      setCategories(storedCategories); // Set the categories state with the fetched data
    };

    fetchCategoriesFromLocalStorage();
  }, []); // Empty dependency array ensures it runs once when the component mounts

  const parseColumnMapping = (columnMapping) => {
    // If columnMapping is an array, return it as is
    if (Array.isArray(columnMapping)) {
      return { columnMapping };
    }

    try {
      // If it's a JSON string, try to parse it
      console.log("Parsing columnMapping:", columnMapping); // Log the columnMapping before parsing
      return JSON.parse(columnMapping);
    } catch (error) {
      console.error('Error parsing columnMapping:', error);
      return { columnMapping: [] }; // Fallback to empty array if parsing fails
    }
  };

  return (
    <>
      <h1>Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Render the category cards */}
        {categories.map((category) => {
          // Safely parse the columnMapping field
          const parsedColumnMapping = parseColumnMapping(category.columnMapping);

          return (
            <div key={category.id} className="bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 flex flex-col">
              <Link to={`/spaCategory/${category.id}`}>
                <h2 className="text-xl font-semibold mb-3 text-gray-200">Category:{category.category}</h2>
                <h3 className="text-md text-gray-400 mb-4">Subcategory:{category.subCategory}</h3>

                {/* Display column mapping */}
                <div>
                  <h4 className="font-semibold text-gray-300">Columns Used:</h4>
                  <ul className="list-disc ml-4 space-y-1">
                    {parsedColumnMapping.columnMapping.map((item, index) => {
                      const columnName = Object.keys(item)[0]; // Get column name (e.g., "Column_2")
                      return (
                        <li key={index} className="text-sm text-gray-300">{columnName}</li>
                      );
                    })}
                  </ul>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ListMetaCard;
