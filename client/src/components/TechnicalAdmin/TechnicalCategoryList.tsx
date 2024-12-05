import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function TechnicalCategoryListTable() {
  const [categories, setCategories] = useState([]); // To store the fetched categories
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch data from backend when component mounts
  useEffect(() => {
    axios.get('http://localhost:4000/api/teachnical/getCategories')
      .then((response) => {
        console.log('response.data',response.data);
        
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
        <h2 className="text-4xl font-bold text-center text-gray-100">Technical Categories</h2>
        {categories.length === 0 ? (
          <p className="text-center text-gray-300">No categories available.</p>
        ) : (
          <div className="space-y-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-gray-700 p-4 rounded-lg shadow-md space-y-2"
              >
                                 <Link to={`/category/${category.id}`}>{category.category}</Link>

                <h3 className="text-xl font-semibold text-gray-100">{category.category}</h3>
                {category.subCategory && (
                  <p className="text-lg text-gray-300">Subcategory: {category.subCategory}</p>
                )}
                <pre className="text-gray-300 mt-2">
                  {category.columnMapping ? JSON.stringify(JSON.parse(category.columnMapping), null, 2) : 'No columns mapped'}
                </pre>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TechnicalCategoryListTable;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// function TechnicalCategoryListTable() {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios.get('http://localhost:4000/api/teachnical/getCategories')
//       .then((response) => {
//         setCategories(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching categories:', error);
//         setLoading(false);
//       });
//   }, []);

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
//         <h2 className="text-4xl font-bold text-center text-gray-100">Technical Categories</h2>
//         {categories.length === 0 ? (
//           <p className="text-center text-gray-300">No categories available.</p>
//         ) : (
//           <div className="space-y-4">
//             {categories.map((category) => (
//               <div
//                 key={category.id}
//                 className="bg-gray-700 p-4 rounded-lg shadow-md space-y-2"
//               >
//                 <h3 className="text-xl font-semibold text-gray-100">
//                   <Link to={`/category/${category.id}`}>{category.category}</Link>
//                 </h3>
//                 {category.subCategory && (
//                   <p className="text-lg text-gray-300">Subcategory: {category.subCategory}</p>
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
