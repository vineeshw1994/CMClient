import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ListMetaCard = () => {
  const [categories, setCategories] = useState([]); // Store categories fetched from backend
  const [error, setError] = useState(null); // Store any error that occurs during the fetch
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [cardsPerPage] = useState(8); // Set the number of cards per page

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

  const hasColumnValue = (columnMapping) => {
    // Check if any column in the mapping has a non-empty value
    return columnMapping.some(item => {
      const columnName = Object.keys(item)[0];
      return item[columnName] && item[columnName] !== 'No value assigned';
    });
  };

  // Pagination logic
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = categories.slice(indexOfFirstCard, indexOfLastCard);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log('cay', categories);

  return (
    <>
      <h1>Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Render the category cards */}
        {currentCards.map((category) => {
          // Safely parse the columnMapping field
          const parsedColumnMapping = parseColumnMapping(category.columnMapping);
          const shouldNavigateToColumnDataAdd = hasColumnValue(parsedColumnMapping.columnMapping); // Check if any column has a value

          return (
            <div key={category.id} className="bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 flex flex-col">
              <Link to={shouldNavigateToColumnDataAdd ? `/spaColumnDataAdd/${category.id}` : `/spaCategory/${category.id}`}>
                <h2 className="text-xl font-semibold mb-3 text-gray-200">Category: {category.category}</h2>
                <h3 className="text-md text-gray-400 mb-4">Subcategory: {category.subCategory}</h3>

                {/* Display column mapping */}
                <div>
                  <h4 className="font-semibold text-gray-300">Columns Used:</h4>
                  <ul className="list-disc ml-4 space-y-1">
                    {parsedColumnMapping.columnMapping.map((item, index) => {
                      const columnName = Object.keys(item)[0]; // Get column name (e.g., "Column_2")
                      const columnValue = item[columnName] || 'No value assigned'; // Get column value, if available
                      
                      return (
                        <li key={index} className="text-sm text-gray-300">
                          {columnName} - {columnValue}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-600 text-white rounded-md mr-2"
        >
          Previous
        </button>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage * cardsPerPage >= categories.length}
          className="px-4 py-2 bg-gray-600 text-white rounded-md"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default ListMetaCard;
