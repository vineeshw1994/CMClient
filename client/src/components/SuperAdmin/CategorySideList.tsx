import React, { useEffect, useState } from 'react';
import {useParams, Link } from 'react-router-dom';
import axios from 'axios';

export const CategorySideList = () => {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategoriesFromBackend = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/superAdmin/listMetaData'); // Fetch metadata from backend API
        const storedCategories = response.data; // Data from backend (metadata.json)

        console.log("Fetched categories:", storedCategories);
        setCategories(storedCategories); // Store fetched categories in the state
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategoriesFromBackend();
  }, []);

  return (
    <div className="bg-gradient-to-b from-gray-800 via-gray-900 to-black text-white w-full sm:w-72 lg:w-52 min-h-full p-4 sm:p-5 transition-all duration-300">
      <div className="flex flex-col space-y-6">
        {/* Dashboard Heading */}
        <div className="text-3xl sm:text-4xl font-extrabold text-center text-gray-200 mb-8">
          Dashboard
        </div>

        <h1 className='font-extrabold text-center text-gray-200 mb-8'>Category LIst</h1>

        {/* Categories List */}
        <div className="flex flex-col space-y-4">
          {categories.map((category, index) => (
            <div key={index} className="mb-0">
              {/* Category Card with Hover Effect */}
              <div className="bg-gray-700 p-2 rounded-lg shadow-md hover:bg-gray-600 transition-all duration-300">
                <Link 
                  to={`/spaColumnDataAdd/${index}`} 
                  className="text-white text-lg sm:text-xl font-semibold hover:text-gray-400"
                >
                  {category.category} {/* Display the category name */}
                </Link>
                <Link 
  to={`/spaListDatasPage/${id}`} 
  className="text-blue-500 hover:text-blue-700"  // Blue color with hover effect
>
  <button className="bg-transparent border-none text-lg font-semibold hover:underline">
    View More
  </button>
</Link>
                {/* Underline under category name */}
                <div className="mt-2 border-b-2 border-gray-400"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
