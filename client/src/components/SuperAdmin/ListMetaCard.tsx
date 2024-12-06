import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ListMetaCard = () => {
  const [categories, setCategories] = useState([]); // Store categories fetched from backend

  useEffect(() => {
    // Fetch data from backend on component mount
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/superAdmin/listMetaCard'); // Replace with your actual backend API
        console.log('res', response.data);
        setCategories(response.data); // Assuming the response is an array of category objects
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };

    fetchCategories();
  }, []); // Empty dependency array ensures it runs once when the component mounts

  const parseColumnMapping = (columnMapping) => {
    // If columnMapping is an array, return it as is
    if (Array.isArray(columnMapping)) {
      return { columnMapping };
    }

    try {
      // If it's a JSON string, try to parse it
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
            <h2 className="text-xl font-semibold mb-3 text-gray-200">{category.category}</h2>
            <h3 className="text-md text-gray-400 mb-4">{category.subCategory}</h3>

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
