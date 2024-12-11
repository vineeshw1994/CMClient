import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function BusinessUserCategoryListTable() {
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch data from localStorage when component mounts
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
  }, []);


  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl text-gray-100 text-center mt-24 font-semibold mb-8">Categories and Subcategories</h2>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="border-b-4 border-white  bg-gray-800">
          <th className="py-2 px-4 text-left text-md font-medium text-gray-50">S.No</th>

            <th className="py-2 px-4 text-left text-md font-medium text-gray-50">Category</th>
            <th className="py-2 px-4 text-left text-md font-medium text-gray-50">Subcategories</th>
            <th className="py-2 px-4 text-center text-md font-medium text-gray-50">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category,index) => (
            <tr key={index} className="border-b hover:bg-gray-300">
                              <td className="py-3 px-4 font-medium text-md text-gray-800">{index + 1}</td>

              <td className="py-3 px-4 text-md font-medium text-gray-800">{category.category}</td>
              <td className="py-3 px-4 text-md font-medium text-gray-600">{category.subcategory}
             
              </td>
              <td className="py-3 px-4 text-center">
                <Link to={`/categoryvaluelist/${index}`}><button
               
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                >
                  View More
                </button></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BusinessUserCategoryListTable;
