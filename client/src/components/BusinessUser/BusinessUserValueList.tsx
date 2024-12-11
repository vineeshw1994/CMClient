// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// // Assuming metadata.json is accessible via a public URL or import
// import metadata from '../../../../../CMServer/assets/metadata.json'; // Adjust path as needed

// function BusinessUserValueList() {
//     const { categoryId } = useParams(); // Get category ID from URL
//   const [categoryData, setCategoryData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  
//   // Assuming we receive the categoryId through props or URL params
//  console.log('categoryId',categoryId);
 

//   // Fetch category data on component mount
//   useEffect(() => {
//     const fetchCategoryData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4000/api/businessAdmin/getCategoryData/${categoryId}`);
//         setCategoryData(response.data); // Set the data for the table rows
//       } catch (err) {
//         setError('Error fetching category data');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCategoryData();
//   }, [categoryId]);

//   // Render table headers dynamically from metadata
//   const renderTableHeaders = () => {
//     const categoryMetadata = metadata.find(item => item.category === categoryId);
//     if (!categoryMetadata) return null;

//     return categoryMetadata.columnMapping.map((col, index) => {
//       const columnName = Object.keys(col)[0]; // Extract column name
//       return (
//         <th key={index} className="py-3 px-4 text-left text-sm font-medium text-gray-700">
//           {columnName.replace('column_', 'Column ')} {/* Replace for readability */}
//         </th>
//       );
//     });
//   };

//   // Render table rows dynamically based on fetched data
//   const renderTableRows = () => {
//     if (!categoryData) return null;

//     return (
//       <tr>
//         {Object.keys(categoryData).map((key, index) => (
//           <td key={index} className="py-3 px-4 text-sm text-gray-800">
//             {categoryData[key] || 'N/A'} {/* Display value or N/A if empty */}
//           </td>
//         ))}
//       </tr>
//     );
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h2 className="text-2xl font-semibold mb-4">Business Category Values</h2>

//       {loading && <div>Loading...</div>}
//       {error && <div className="text-red-500">{error}</div>}

//       {/* Table Layout */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white shadow-md rounded-lg">
//           <thead>
//             <tr className="border-b bg-gray-200">
//               {renderTableHeaders()}
//             </tr>
//           </thead>
//           <tbody>
//             {renderTableRows()}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default BusinessUserValueList;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// // Assuming metadata.json is accessible via a public URL or import
// import metadata from '../../../../../CMServer/assets/metadata.json'; // Adjust path as needed

// function BusinessUserValueList() {
//   const { categoryId } = useParams(); // Get category ID from URL
//   const [categoryData, setCategoryData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch category data on component mount
//   useEffect(() => {
//     const fetchCategoryData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4000/api/businessAdmin/getCategoryData/${categoryId}`);
//         setCategoryData(response.data); // Set the data for the table rows
//         console.log('response.data',response.data);
        
//       } catch (err) {
//         setError('Error fetching category data');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCategoryData();
//   }, [categoryId]);

//   // Render table headers dynamically from metadata
//   const renderTableHeaders = () => {
//     const categoryMetadata = metadata.find(item => item.category === categoryId); // Find the metadata for the specific category
//     if (!categoryMetadata) return null;

//     return categoryMetadata.columnMapping.map((col, index) => {
//       const columnName = Object.values(col)[0]; // Extract the column name (like 'RAM', 'CAMERA')
//       return (
//         <th key={index} className="py-3 px-4 text-left text-sm font-medium text-gray-700">
//           {columnName}
//         </th>
//       );
//     });
//   };

//   // Render table rows dynamically based on fetched data
//   const renderTableRows = () => {
//     if (!categoryData) return null;

//     return (
//       <tr>
//         {Object.keys(categoryData).map((key, index) => (
//           <td key={index} className="py-3 px-4 text-sm text-gray-800">
//             {categoryData[key] || 'N/A'} {/* Display value or N/A if empty */}
//           </td>
//         ))}
//       </tr>
//     );
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h2 className="text-2xl font-semibold mb-4">Business Category Values</h2>

//       {loading && <div>Loading...</div>}
//       {error && <div className="text-red-500">{error}</div>}

//       {/* Table Layout */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white shadow-md rounded-lg">
//           <thead>
//             <tr className="border-b bg-gray-200">
//               {renderTableHeaders()}
//             </tr>
//           </thead>
//           <tbody>
//             {renderTableRows()}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default BusinessUserValueList;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// function BusinessUserValueList() {
//   const { categoryId } = useParams(); // Get category ID from URL
//   const [categoryData, setCategoryData] = useState(null);
//   const [columns, setColumns] = useState([]);  // Columns (e.g., RAM, CAMERA)
//   const [columnKeys, setColumnKeys] = useState([]); // Keys for the categoryData (e.g., column_8, column_9)
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch category data on component mount
//   useEffect(() => {
//     const fetchCategoryData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4000/api/businessAdmin/getCategoryData/${categoryId}`);
//         setCategoryData(response.data.data); // Set the data for the table rows
//         setColumns(response.data.columns); // Set the columns for the table headers
//         setColumnKeys(Object.keys(response.data.data)); // Set the keys (e.g., column_8, column_9)
//         console.log('response.data', response.data);
//       } catch (err) {
//         setError('Error fetching category data');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCategoryData();
//   }, [categoryId]);

//   console.log('columns', columns);
//   console.log('categoryData', categoryData);
//   console.log('columnKeys', columnKeys);

//   // Render table headers dynamically from columns
//   const renderTableHeaders = () => {
//     if (!columns || columns.length === 0) return null;

//     return columns.map((col, index) => (
//       <th key={index} className="py-3 px-4 text-left text-sm font-medium text-gray-700 border-b">
//         {col} {/* Display column name from the backend */}
//       </th>
//     ));
//   };

//   // Render table rows dynamically based on fetched data
//   const renderTableRows = () => {
//     if (!categoryData || !columns || !columnKeys) return null;

//     return (
//       <tr>
//         {columns.map((col, index) => {
//           // Get the corresponding column key, e.g., column_8, column_9, etc.
//           const columnKey = columnKeys[index]; // This will give us column_8, column_9, etc.
//           return (
//             <td key={index} className="py-3 px-4 text-sm text-gray-800 border-b">
//               {categoryData[columnKey] || 'N/A'} {/* Display value or N/A if empty */}
//             </td>
//           );
//         })}
//       </tr>
//     );
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h2 className="text-2xl font-semibold mb-4">Business Category Values</h2>

//       {loading && <div>Loading...</div>}
//       {error && <div className="text-red-500">{error}</div>}

//       {/* Table Layout */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white shadow-md rounded-lg border-separate">
//           <thead className="bg-gray-200">
//             <tr>{renderTableHeaders()}</tr>
//           </thead>
//           <tbody>{renderTableRows()}</tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default BusinessUserValueList;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function BusinessUserValueList() {
  const { categoryId } = useParams(); // Get category ID from URL
  const [categoryData, setCategoryData] = useState([]); // Changed to an array to handle multiple rows
  const [columns, setColumns] = useState([]);  // Columns (e.g., RAM, CAMERA)
  const [columnKeys, setColumnKeys] = useState([]); // Keys for the categoryData (e.g., column_8, column_9)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch category data on component mount
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/businessAdmin/getCategoryData/${categoryId}`);
        setCategoryData(response.data.data); // Set the data for the table rows
        setColumns(response.data.columns); // Set the columns for the table headers
        setColumnKeys(Object.keys(response.data.data[0] || {})); // Set the keys dynamically from the first row if available
        console.log('response.data', response.data);
      } catch (err) {
        setError('Error fetching category data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [categoryId]);

  console.log('columns', columns);
  console.log('categoryData', categoryData);
  console.log('columnKeys', columnKeys);

  // Render table headers dynamically from columns
  const renderTableHeaders = () => {
    if (!columns || columns.length === 0) return null;

    return columns.map((col, index) => (
      <th key={index} className="py-3 px-4 text-left bg-slate-800 text-lg font-medium text-gray-50 border-b">
        {col} {/* Display column name from the backend */}
      </th>
    ));
  };

  // Render table rows dynamically based on fetched data
  const renderTableRows = () => {
    if (!categoryData || categoryData.length === 0) return null;

    return categoryData.map((row, rowIndex) => (
      <tr key={rowIndex}>
        {columnKeys.map((columnKey, index) => {
          return (
            <td key={index} className="py-3 px-4 text-md bg-gray-300 font-bold text-slate-900 border-b">
              {row[columnKey] || 'N/A'} {/* Display value or N/A if empty */}
            </td>
          );
        })}
      </tr>
    ));
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl mt-14 text-yellow-50 text-center font-semibold mb-4"> Category Values</h2>
     <Link to='/showCategory'> <button
      className="mt-4 px-6 py-2 bg-green-700 text-white rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
    >
      Back
    </button></Link>

      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}

      {/* Table Layout */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg border-separate">
          <thead className="bg-gray-200">
            <tr>{renderTableHeaders()}</tr>
          </thead>
          <tbody>{renderTableRows()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default BusinessUserValueList;
