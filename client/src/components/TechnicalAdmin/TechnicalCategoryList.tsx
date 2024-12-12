
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

// function TechnicalCategoryListTable() {
//   const [categories, setCategories] = useState([]); // To store the fetched categories
//   const [loading, setLoading] = useState(true); // Loading state
//   const [error, setError] = useState(null); // Error state

//   // Fetch data from localStorage when component mounts
//   useEffect(() => {
//     const fetchMetadata = async () => {
//       try {
//         const response = await axios.get('http://localhost:4000/api/teachnical/getCategories'); // Backend API endpoint
//         setCategories(response.data); // Set the fetched metadata to state
//       } catch (err) {
//         setError('Error fetching metadata');
//         console.error(err);
//       } finally {
//         setLoading(false); // Stop loading after the fetch attempt
//       }
//     };

//     fetchMetadata();
//   }, []); // Empty dependency array to run only once on component mount

//   // Show loading message until data is fetched
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <span className="text-lg text-white">Loading categories...</span>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-900 text-white min-h-screen py-12 px-6">
//       <div className="max-w-7xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg space-y-6">
//         <h2 className="text-4xl font-bold text-center text-gray-100 mb-6">Technical Categories</h2>
//         {categories.length === 0 ? (
//           <p className="text-center text-gray-300">No categories available.</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {categories.map((category, index) => (
//               <div
//                 key={index} // Use index if category id is not available
//                 className="bg-gray-700 p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:bg-gray-600"
//               >
//                 <Link
//                   to={`/category/${index}`} // Use index for the link, or use category.id if available
//                   className="block text-xl font-semibold text-gray-100 mb-4 hover:text-indigo-400 transition-colors duration-300"
//                 >
//                   {category.category}
//                 </Link>

//                 <h3 className="text-lg text-gray-300 font-medium">{category.category}</h3>
//                 {category.subcategory && (
//                   <p className="text-sm text-gray-400 mt-2">Subcategory: {category.subcategory}</p>
//                 )}
//                 {category.columnMapping && (
//                   <div className="mt-4">
//                     <h4 className="text-sm text-gray-400 font-semibold">Column Mapping:</h4>
//                     <ul className="text-sm text-gray-300 space-y-2 mt-2">
//                       {Array.isArray(category.columnMapping) ? (
//                         category.columnMapping.map((column, index) => {
//                           // For each column object, iterate over its keys
//                           return Object.keys(column).map((columnKey) => {
//                             // Check if the value is an object and handle accordingly
//                             const columnValue = column[columnKey];
//                             return (
//                               <li key={index + columnKey}>
//                                 <strong>{columnKey}:</strong>
//                                 {typeof columnValue === 'object' ? (
//                                   // If the value is an object, display its inner keys and values
//                                   <ul className="ml-4 space-y-1">
//                                     {Object.entries(columnValue).map(([nestedKey, nestedValue], idx) => (
//                                       <li key={idx}>
//                                         <strong>{nestedKey}:</strong> {nestedValue || 'No value'}
//                                       </li>
//                                     ))}
//                                   </ul>
//                                 ) : (
//                                   // If it's not an object, just display the value directly
//                                   <span>{columnValue || 'No value'}</span>
//                                 )}
//                               </li>
//                             );
//                           });
//                         })
//                       ) : (
//                         <li>No column mappings available.</li>
//                       )}
//                     </ul>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default TechnicalCategoryListTable;





// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// function TechnicalCategoryListTable() {
//   const [categories, setCategories] = useState([]); // To store the fetched categories
//   const [loading, setLoading] = useState(true); // Loading state
//   const [error, setError] = useState(null); // Error state
//   const [currentPage, setCurrentPage] = useState(1); // Current page state
//   const itemsPerPage = 8; // Limit of items per page

//   // Fetch data from localStorage when component mounts
//   useEffect(() => {
//     const fetchMetadata = async () => {
//       try {
//         const response = await axios.get('http://localhost:4000/api/teachnical/getCategories'); // Backend API endpoint
//         setCategories(response.data); // Set the fetched metadata to state
//       } catch (err) {
//         setError('Error fetching metadata');
//         console.error(err);
//       } finally {
//         setLoading(false); // Stop loading after the fetch attempt
//       }
//     };

//     fetchMetadata();
//   }, []); // Empty dependency array to run only once on component mount

//   // Pagination logic to slice the categories
//   const indexOfLastCategory = currentPage * itemsPerPage;
//   const indexOfFirstCategory = indexOfLastCategory - itemsPerPage;
//   const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);

//   // Function to handle page change
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   // Show loading message until data is fetched
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <span className="text-lg text-white">Loading categories...</span>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-900 text-white min-h-screen py-12 px-6">
//       <div className="max-w-7xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg space-y-6">
//         <h2 className="text-4xl font-bold text-center text-gray-100 mb-6">Technical Categories</h2>
//         {categories.length === 0 ? (
//           <p className="text-center text-gray-300">No categories available.</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {currentCategories.map((category, index) => (
//               <div
//                 key={index} // Use index if category id is not available
//                 className="bg-gray-700 p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:bg-gray-600"
//               >
//                 <Link
//                   to={`/category/${index}`} // Use index for the link, or use category.id if available
//                   className="block text-xl font-semibold text-gray-100 mb-4 hover:text-indigo-400 transition-colors duration-300"
//                 >
//                   {category.category}
//                 </Link>

//                 <h3 className="text-lg text-gray-300 font-medium">{category.category}</h3>
//                 {category.subcategory && (
//                   <p className="text-sm text-gray-400 mt-2">Subcategory: {category.subcategory}</p>
//                 )}
//                 {category.columnMapping && (
//                   <div className="mt-4">
//                     <h4 className="text-sm text-gray-400 font-semibold">Column Mapping:</h4>
//                     <ul className="text-sm text-gray-300 space-y-2 mt-2">
//                       {Array.isArray(category.columnMapping) ? (
//                         category.columnMapping.map((column, index) => {
//                           return Object.keys(column).map((columnKey) => {
//                             const columnValue = column[columnKey];
//                             return (
//                               <li key={index + columnKey}>
//                                 <strong>{columnKey}:</strong>
//                                 {typeof columnValue === 'object' ? (
//                                   <ul className="ml-4 space-y-1">
//                                     {Object.entries(columnValue).map(([nestedKey, nestedValue], idx) => (
//                                       <li key={idx}>
//                                         <strong>{nestedKey}:</strong> {nestedValue || 'No value'}
//                                       </li>
//                                     ))}
//                                   </ul>
//                                 ) : (
//                                   <span>{columnValue || 'No value'}</span>
//                                 )}
//                               </li>
//                             );
//                           });
//                         })
//                       ) : (
//                         <li>No column mappings available.</li>
//                       )}
//                     </ul>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Pagination Controls */}
//         <div className="flex justify-center space-x-4 mt-6">
//           {currentPage > 1 && (
//             <button
//               onClick={() => paginate(currentPage - 1)}
//               className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
//             >
//               Previous
//             </button>
//           )}
//           {Array.from({ length: Math.ceil(categories.length / itemsPerPage) }).map((_, idx) => (
//             <button
//               key={idx}
//               onClick={() => paginate(idx + 1)}
//               className={`px-4 py-2 rounded ${currentPage === idx + 1 ? 'bg-indigo-500 text-white' : 'bg-gray-700 text-gray-300'} hover:bg-gray-600`}
//             >
//               {idx + 1}
//             </button>
//           ))}
//           {currentPage < Math.ceil(categories.length / itemsPerPage) && (
//             <button
//               onClick={() => paginate(currentPage + 1)}
//               className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
//             >
//               Next
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default TechnicalCategoryListTable;


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function TechnicalCategoryListTable() {
  const [categories, setCategories] = useState([]); // To store the fetched categories
  const [filteredCategories, setFilteredCategories] = useState([]); // To store filtered categories
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [searchQuery, setSearchQuery] = useState(''); // Search query state
  const itemsPerPage = 8; // Limit of items per page

  // Fetch data from localStorage when component mounts
  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/teachnical/getCategories'); // Backend API endpoint
        setCategories(response.data); // Set the fetched metadata to state
        setFilteredCategories(response.data); // Initialize filtered categories
      } catch (err) {
        setError('Error fetching metadata');
        console.error(err);
      } finally {
        setLoading(false); // Stop loading after the fetch attempt
      }
    };

    fetchMetadata();
  }, []); // Empty dependency array to run only once on component mount

  // Filter categories based on the search query
  useEffect(() => {
    const result = categories.filter(category =>
      category.category.toLowerCase().includes(searchQuery.toLowerCase()) // Case-insensitive search
    );
    setFilteredCategories(result); // Update filtered categories
    setCurrentPage(1); // Reset to the first page after search
  }, [searchQuery, categories]); // Re-run when searchQuery or categories change

  // Pagination logic to slice the filtered categories
  const indexOfLastCategory = currentPage * itemsPerPage;
  const indexOfFirstCategory = indexOfLastCategory - itemsPerPage;
  const currentCategories = filteredCategories.slice(indexOfFirstCategory, indexOfLastCategory);

  // Function to handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

        {/* Search Bar */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 rounded-lg text-black"
          />
        </div>

        {filteredCategories.length === 0 ? (
          <p className="text-center text-gray-300">No categories found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentCategories.map((category, index) => (
              <div
                key={index} // Use index if category id is not available
                className="bg-gray-700 p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:bg-gray-600"
              >
                <Link
                  to={`/category/${index}`} // Use index for the link, or use category.id if available
                  className="block text-xl font-semibold text-gray-100 mb-4 hover:text-indigo-400 transition-colors duration-300"
                >
                  {category.category}
                </Link>

                <h3 className="text-lg text-gray-300 font-medium">{category.category}</h3>
                {category.subcategory && (
                  <p className="text-sm text-gray-400 mt-2">Subcategory: {category.subcategory}</p>
                )}
                {category.columnMapping && (
                  <div className="mt-4">
                    <h4 className="text-sm text-gray-400 font-semibold">Column Mapping:</h4>
                    <ul className="text-sm text-gray-300 space-y-2 mt-2">
                      {Array.isArray(category.columnMapping) ? (
                        category.columnMapping.map((column, index) => {
                          return Object.keys(column).map((columnKey) => {
                            const columnValue = column[columnKey];
                            return (
                              <li key={index + columnKey}>
                                <strong>{columnKey}:</strong>
                                {typeof columnValue === 'object' ? (
                                  <ul className="ml-4 space-y-1">
                                    {Object.entries(columnValue).map(([nestedKey, nestedValue], idx) => (
                                      <li key={idx}>
                                        <strong>{nestedKey}:</strong> {nestedValue || 'No value'}
                                      </li>
                                    ))}
                                  </ul>
                                ) : (
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

        {/* Pagination Controls */}
        <div className="flex justify-center space-x-4 mt-6">
          {currentPage > 1 && (
            <button
              onClick={() => paginate(currentPage - 1)}
              className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
            >
              Previous
            </button>
          )}
          {Array.from({ length: Math.ceil(filteredCategories.length / itemsPerPage) }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => paginate(idx + 1)}
              className={`px-4 py-2 rounded ${currentPage === idx + 1 ? 'bg-indigo-500 text-white' : 'bg-gray-700 text-gray-300'} hover:bg-gray-600`}
            >
              {idx + 1}
            </button>
          ))}
          {currentPage < Math.ceil(filteredCategories.length / itemsPerPage) && (
            <button
              onClick={() => paginate(currentPage + 1)}
              className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TechnicalCategoryListTable;
