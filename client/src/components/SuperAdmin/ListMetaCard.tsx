import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ListMetaCard = () => {
  const [categories, setCategories] = useState([]); // Store categories fetched from backend
  const [error, setError] = useState(null); // Store any error that occurs during the fetch

  // Fetch categories from backend on mount
  useEffect(() => {
    const fetchCategoriesFromBackend = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/superAdmin/listMetaData'); // Fetch metadata from backend API
        const storedCategories = response.data; // Data from backend (metadata.json)

        console.log("Fetched categories:", storedCategories); // Log the fetched data for debugging

        // Map the categories from the fetched data
        const categoriesList = storedCategories.map((category, index) => {
          return {
            id: index, // or use category.id if available in metadata
            category: category.category,
            subCategory: category.subcategory,
            columnMapping: category.columnMapping,
          };
        });

        setCategories(categoriesList); // Set the fetched data to state
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError('Failed to fetch categories'); // Set error message if fetch fails
      }
    };

    fetchCategoriesFromBackend();
  }, []); // Empty dependency array ensures it runs once when the component mounts

  const parseColumnMapping = (columnMapping) => {
    // Safely parse columnMapping if it's a JSON string or array
    if (Array.isArray(columnMapping)) {
      return { columnMapping };
    }

    try {
      console.log("Parsing columnMapping:", columnMapping); // Log the columnMapping before parsing
      return JSON.parse(columnMapping); // Parse columnMapping if it's a JSON string
    } catch (error) {
      console.error('Error parsing columnMapping:', error);
      return { columnMapping: [] }; // Return empty array if parsing fails
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

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
                <h2 className="text-xl font-semibold mb-3 text-gray-200">Category: {category.category}</h2>
                <h3 className="text-md text-gray-400 mb-4">Subcategory: {category.subCategory}</h3>

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
