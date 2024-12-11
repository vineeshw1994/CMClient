
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function BusinessAdminSideList() {
  const [categories, setCategories] = useState([]); // To store the fetched categories
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch data from the API when component mounts
  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/businessAdmin/getCategorylist'); // Backend API endpoint
        setCategories(response.data); // Set the fetched metadata to state
      } catch (err) {
        setError('Error fetching metadata');
        console.error(err);
      } finally {
        setLoading(false); // Stop loading after the fetch attempt
      }
    };

    fetchMetadata();
  }, []); // Empty dependency array to run only once on component mount

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
      <div className="max-w-xs mx-auto bg-gray-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold text-center text-gray-100 mb-6">Business Categories</h2>
        
        {categories.length === 0 ? (
          <p className="text-center text-gray-300">No categories available.</p>
        ) : (
          <div className="space-y-4">
             {categories.map((category, index) => (
              <div key={index} className="bg-gray-700 p-4 rounded-lg shadow-lg">
                <Link
                  to={`/businessCategory/${index}`} // Link to category using index (you can use category.id if available)
                  className="block text-xl text-gray-100 font-semibold hover:text-indigo-400 transition-colors duration-300"
                >
                  {category.category}
                </Link>
                {category.subcategory && (
                  <ul className="mt-2 text-gray-300 text-sm space-y-2">
                    <li><strong>Subcategory:</strong> {category.subcategory}</li>
                  </ul>
                )}

      
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BusinessAdminSideList;
