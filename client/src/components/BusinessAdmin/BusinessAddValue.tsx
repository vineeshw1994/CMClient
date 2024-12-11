// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function BusinessCategoryForm() {
//   const { id } = useParams(); // Get category ID from URL
//   const navigate = useNavigate();
//   const [columns, setColumns] = useState([]);
//   const [formData, setFormData] = useState({});
//   const [loading, setLoading] = useState(true);

//   // Fetch category data and column mapping from API
//   useEffect(() => {
//     axios.get(`http://localhost:4000/api/businessAdmin/getCategoryvalue/${id}`)
//       .then((response) => {
//         let columnData = [];
//         // Check if columnMapping is a string and parse it, otherwise use it directly
//         if (typeof response.data.columnMapping === 'string') {
//           try {
//             columnData = JSON.parse(response.data.columnMapping).columnMapping;
//           } catch (error) {
//             console.error('Error parsing columnMapping:', error);
//           }
//         } else {
//           columnData = response.data.columnMapping?.columnMapping || [];
//         }

//         // Ensure columnData is an array
//         columnData = Array.isArray(columnData) ? columnData : [];

//         setColumns(columnData); // Set columns to the parsed array


//         // Initialize formData with keys from columnMapping (values are initially empty)
//         setFormData(
//           columnData.reduce((acc, col) => {
//             Object.keys(col).forEach(key => {
//               acc[key] = { key: key, value: '' }; // Initialize value as empty
//             });
//             return acc;
//           }, {})
//         );

//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching category columns:', error);
//         setLoading(false);
//       });
//   }, [id]);

//   // Handle input change for value
//   const handleInputChange = (e, columnKey) => {
//     const { value } = e.target;
//     const newFormData = { ...formData };
//     newFormData[columnKey].value = value; // Update value for the column
//     setFormData(newFormData);
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Prepare data for submission by only sending keys with the values entered
//     const formattedData = Object.keys(formData).reduce((acc, columnKey) => {
//       const { key, value } = formData[columnKey];
//       console.log(' key, value', key, value);
      
//       if (value) {
//         acc[columnKey] = { [key]: value }; // Send value only if it's not empty
//       }
//       return acc;
//     }, {});

//     // Wrap the formatted data inside columnMapping
//     const finalData = { columnMapping: Object.entries(formattedData).map(([columnKey, data]) => ({
//       [columnKey]: data
//     })) };

//     // Send the data to the backend
//     axios.post('http://localhost:4000/api/businessAdmin/saveData', {
//       categoryId: id,
//       data: finalData,
//     })
//       .then((response) => {
//         alert('Data saved successfully!');
//         navigate('/'); // Redirect to home page after saving
//       })
//       .catch((error) => {
//         console.error('Error saving data:', error);
//       });
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <span className="text-lg text-white">Loading form...</span>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-900 text-white min-h-screen py-12 px-6">
//       <div className="max-w-7xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg space-y-6">
//         <h2 className="text-4xl font-bold text-center text-gray-100">Add Value to Category {id}</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Render columns and allow business admin to add values */}
//           {columns.map((column, index) => (
//             <div key={index} className="space-y-2">
//               {Object.keys(column).map((columnKey) => (
//                 <div key={columnKey} className="space-y-2">
//                   <label className="text-lg text-gray-300">Key: {columnKey}</label>

//                   <div className="flex flex-col space-y-2">
//                     {/* Read-only input for Key */}
//                     <input
//                       type="text"
//                       value={formData[columnKey]?.key || ''}
//                       readOnly
//                       className="w-full p-2 rounded-lg bg-gray-700 text-white"
//                     />

//                     {/* Input for Value - Editable */}
//                     <input
//                       type="text"
//                       value={formData[columnKey]?.value || ''}
//                       onChange={(e) => handleInputChange(e, columnKey)}
//                       className="w-full p-2 rounded-lg bg-gray-700 text-white"
//                       placeholder={`Enter value for ${columnKey}`}
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ))}
//           <button
//             type="submit"
//             className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg"
//           >
//             Save Data
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default BusinessCategoryForm;

// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function BusinessCategoryForm() {
//   const { id } = useParams(); // Get category ID from URL
//   const navigate = useNavigate();
//   const [columns, setColumns] = useState([]);  // Holds column data
//   const [formData, setFormData] = useState({}); // Holds form data for key-value pairs
//   const [loading, setLoading] = useState(true); // Loading state

//   // Fetch category data and column mapping from API
//   useEffect(() => {
//     axios.get(`http://localhost:4000/api/businessAdmin/getCategoryvalue/${id}`)
//       .then((response) => {
//         const columnData = response.data.columnMapping || [];

//         // Ensure columnData is an array
//         setColumns(columnData); 

//         // Initialize formData with keys from columnMapping (values are initially empty)
//         const initialFormData = columnData.reduce((acc, col) => {
//           Object.keys(col).forEach((columnKey) => {
//             // Iterate over each key in each column object and initialize the form data
//             Object.keys(col[columnKey]).forEach((key) => {
//               acc[`${columnKey}_${key}`] = { key, value: '' }; // Initialize value as empty
//             });
//           });
//           return acc;
//         }, {});

//         setFormData(initialFormData);  // Set the form data state with empty values
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching category columns:', error);
//         alert('There was an error fetching the category data. Please try again later.');
//         setLoading(false);
//       });
//   }, [id]);

//   // Handle input change for value
//   const handleInputChange = (e, columnKey) => {
//     const { value } = e.target;
//     const newFormData = { ...formData };
//     newFormData[columnKey].value = value; // Update value for the column
//     setFormData(newFormData);
//   };


// const handleSubmit = (e) => {
//     e.preventDefault();
  
//     // Prepare data for submission by only sending keys with values entered
//     const formattedData = Object.keys(formData).reduce((acc, columnKey) => {
//       const { key, value } = formData[columnKey];
  
//       if (value) {
//         // Split the columnKey into column name (e.g., Column_2) and key (e.g., MEMORY)
//         const [columnName, columnKeyName] = columnKey.split('_'); // Split "Column_2" to ["Column", "2"], and "ram"
  
//         // Ensure the column name is properly formatted (e.g., "Column_2")
//         const cleanColumnName = `${columnName}_${columnKeyName}`; // "Column_2" or "Column_3"
  
//         // Check if the column already exists in the accumulator (acc)
//         let columnData = acc.find(item => item[cleanColumnName]);
//         if (!columnData) {
//           // If the column doesn't exist, create a new entry with an empty object
//           columnData = { [cleanColumnName]: {} };
//           acc.push(columnData);
//         }
  
//         // Now, add the key-value pair (e.g., "ram": "5GB") for that column
//         columnData[cleanColumnName][key] = value;
//       }
  
//       return acc;
//     }, []);
  
//     // Log the formattedData to check the structure
//     console.log('formattedData', formattedData);
  
//     // Wrap the formatted data inside columnMapping
//     const finalData =  formattedData ;
  
//     // Log the finalData to check if it's in the correct format
//     console.log('finalData', finalData);
  
//     // Send the data to the backend
//     axios.post('http://localhost:4000/api/businessAdmin/saveValueData', {
//       categoryId: id,
//       data: finalData,
//     })
//       .then((response) => {
//         alert('Data saved successfully!');
//         navigate('/'); // Redirect to home page after saving
//       })
//       .catch((error) => {
//         console.error('Error saving data:', error);
//       });
//   };
  
  
//   // Loading state
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <span className="text-lg text-white">Loading form...</span>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-900 text-white min-h-screen py-12 px-6">
//       <div className="max-w-7xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg space-y-6">
//         <h2 className="text-4xl font-bold text-center text-gray-100">Add Value to Category {id}</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Render columns and allow business admin to add values */}
//           {columns.map((column, index) => (
//             <div key={index} className="space-y-2">
//               {Object.keys(column).map((columnKey) => (
//                 <div key={columnKey} className="space-y-2">
//                   <h3 className="text-lg text-gray-300">{columnKey}</h3>
//                   {Object.keys(column[columnKey]).map((key) => (
//                     <div key={`${columnKey}_${key}`} className="space-y-2">
//                       <label className="text-lg text-gray-300">Key: {key}</label>

//                       <div className="flex flex-col space-y-2">
//                         {/* Read-only input for Key */}
//                         <input
//                           type="text"
//                           value={key}
//                           readOnly
//                           className="w-full p-2 rounded-lg bg-gray-700 text-white"
//                         />

//                         {/* Input for Value - Editable */}
//                         <input
//                           type="text"
//                           value={formData[`${columnKey}_${key}`]?.value || ''}
//                           onChange={(e) => handleInputChange(e, `${columnKey}_${key}`)}
//                           className="w-full p-2 rounded-lg bg-gray-700 text-white"
//                           placeholder={`Enter value for ${key}`}
//                         />
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ))}
//             </div>
//           ))}
//           <button
//             type="submit"
//             className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg"
//           >
//             Save Data
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default BusinessCategoryForm;

// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function BusinessCategoryForm() {
//   const { id } = useParams(); // Get category ID from URL
//   const navigate = useNavigate();
//   const [columns, setColumns] = useState([]);  // Holds column data
//   const [rows, setRows] = useState([{}]); // Holds table rows, each row represents values for columns
//   const [loading, setLoading] = useState(true); // Loading state
//   const [categoryData, setCategoryData] = useState({}); // Holds category data

//   useEffect(() => {
//     // Fetch category columns and category metadata from the backend
//     axios.get(`http://localhost:4000/api/businessAdmin/getCategoryvalue/${id}`)
//       .then((response) => {
//         const columnData = response.data.columnMapping || [];
//         const categoryMetadata = response.data.categoryMetadata || {};
//         setColumns(columnData);
//         setCategoryData(categoryMetadata);

//         // Initialize form data for columns
//         const initialRows = [{ ...columnData.reduce((acc, col) => {
//           const columnKey = Object.keys(col)[0];
//           acc[columnKey] = ''; // Initialize empty value for each column
//           return acc;
//         }, {}) }];
//         setRows(initialRows);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching category columns:', error);
//         alert('There was an error fetching the category data. Please try again later.');
//         setLoading(false);
//       });
//   }, [id]);

//   const handleInputChange = (e, columnKey, rowIndex) => {
//     const { value } = e.target;
//     const updatedRows = [...rows];
//     updatedRows[rowIndex][columnKey] = value; // Update the corresponding column value for this row
//     setRows(updatedRows);
//   };

//   const handleAddRow = () => {
//     setRows([...rows, { ...columns.reduce((acc, col) => {
//       const columnKey = Object.keys(col)[0];
//       acc[columnKey] = ''; // Initialize empty value for each column in the new row
//       return acc;
//     }, {}) }]);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Prepare data to send to the backend
//     const formattedData = rows.map(row => {
//       return columns.map((column) => {
//         const columnName = Object.keys(column)[0];
//         return { [columnName]: row[columnName] }; // Map each column to its respective value in the row
//       });
//     });

//     // Prepare final data to send to backend including category and subcategory metadata
//     const postData = {
//       categoryId: id,
//       categoryName: categoryData.category,
//       subCategoryName: categoryData.subCategory,
//       data: formattedData,
//     };

//     // Send data to the backend
//     axios.post('http://localhost:4000/api/businessAdmin/saveValueData', postData)
//       .then((response) => {
//         alert('Data saved successfully!');
//         navigate('/'); // Redirect to home page after saving
//       })
//       .catch((error) => {
//         console.error('Error saving data:', error);
//         alert('Error saving data. Please try again later.');
//       });
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <span className="text-lg text-white">Loading form...</span>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-900 text-white min-h-screen py-12 px-6">
//       <div className="max-w-7xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg space-y-6">
//         <h2 className="text-4xl font-bold text-center text-gray-100">
//           Add Value to Category {categoryData.category}
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Table structure for input */}
//           <table className="w-full table-auto border-collapse">
//             <thead>
//               <tr>
//                 {columns.map((column, index) => (
//                   <th key={index} className="px-4 py-2 text-left text-gray-300">
//                     {Object.keys(column)[0]}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {rows.map((row, rowIndex) => (
//                 <tr key={rowIndex}>
//                   {columns.map((column, index) => {
//                     const columnKey = Object.keys(column)[0];
//                     return (
//                       <td key={index} className="px-4 py-2">
//                         <input
//                           type="text"
//                           value={row[columnKey] || ''}
//                           onChange={(e) => handleInputChange(e, columnKey, rowIndex)}
//                           className="w-full p-2 rounded-lg bg-gray-700 text-white"
//                           placeholder={`Enter value for ${columnKey}`}
//                         />
//                       </td>
//                     );
//                   })}
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {/* Add row button */}
//           <div className="mt-4">
//             <button
//               type="button"
//               onClick={handleAddRow}
//               className="px-6 py-2 bg-green-600 text-white rounded-lg"
//             >
//               Add More Values
//             </button>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg"
//           >
//             Save Data
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default BusinessCategoryForm;


import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function BusinessCategoryForm() {
  const { id } = useParams(); // Get category ID from URL
  const navigate = useNavigate();
  const [columns, setColumns] = useState([]);  // Holds column data
  const [rows, setRows] = useState([{}]); // Holds table rows, each row represents values for columns
  const [loading, setLoading] = useState(true); // Loading state
  const [categoryData, setCategoryData] = useState({}); // Holds category data

  useEffect(() => {
    // Fetch category columns and category metadata from the backend
    axios.get(`http://localhost:4000/api/businessAdmin/getCategoryvalue/${id}`)
      .then((response) => {
        const columnData = response.data.columnMapping || [];
        const categoryMetadata = response.data || {};
        setColumns(columnData);
        setCategoryData(categoryMetadata);
console.log('response.data',response.data);
console.log('columnData',columnData);

        // Initialize form data for columns
        const initialRows = [{ ...columnData.reduce((acc, col) => {
          const columnKey = Object.keys(col)[0];
          acc[columnKey] = ''; // Initialize empty value for each column
          return acc;
        }, {}) }];
        setRows(initialRows);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching category columns:', error);
        alert('There was an error fetching the category data. Please try again later.');
        setLoading(false);
      });
  }, [id]);
console.log('categoryData',categoryData);

  const handleInputChange = (e, columnKey, rowIndex) => {
    const { value } = e.target;
    const updatedRows = [...rows];
    updatedRows[rowIndex][columnKey] = value; // Update the corresponding column value for this row
    setRows(updatedRows);
  };

  const handleAddRow = () => {
    setRows([...rows, { ...columns.reduce((acc, col) => {
      const columnKey = Object.keys(col)[0];
      acc[columnKey] = ''; // Initialize empty value for each column in the new row
      return acc;
    }, {}) }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare data to send to the backend
    const formattedData = rows.map(row => {
      return columns.map((column) => {
        const columnName = Object.keys(column)[0];
        return { [columnName]: row[columnName] }; // Map each column to its respective value in the row
      });
    });
console.log('formattedData',formattedData);

    // Prepare final data to send to backend including category and subcategory metadata
    const postData = {
      categoryId: id,
      categoryName: categoryData.category,
      subCategoryName: categoryData.subcategory,
      data: formattedData,
    };
console.log('postData',postData);

    // Send data to the backend
    axios.post('http://localhost:4000/api/businessAdmin/saveValueData', postData)
      .then((response) => {
        alert('Data saved successfully!');
        navigate('/businessAdmin'); // Redirect to home page after saving
      })
      .catch((error) => {
        console.error('Error saving data:', error);
        alert('Error saving data. Please try again later.');
      });
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-lg text-white">Loading form...</span>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg space-y-6">
        <h2 className="text-4xl font-bold text-center text-gray-100">
          Add Value to Category {categoryData.category}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Table structure for input */}
          <table className="w-full table-auto border-collapse">
            <thead>
            <tr>
                {columns.map((column, index) => {
                  // Get the column name from the object structure
                  const columnName = Object.values(column)[0]; // Assuming value is the column name
                  return (
                    <th key={index} className="px-4 py-2 text-left text-gray-300">
                      {columnName}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((column, index) => {
                    const columnKey = Object.keys(column)[0];
                    return (
                      <td key={index} className="px-4 py-2">
                        <input
                          type="text"
                          value={row[columnKey] || ''}
                          onChange={(e) => handleInputChange(e, columnKey, rowIndex)}
                          className="w-full p-2 rounded-lg bg-gray-700 text-white"
                          placeholder={`Enter value for ${columnKey}`}
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Add row button */}
          <div className="mt-4">
            <button
              type="button"
              onClick={handleAddRow}
              className="px-6 py-2 bg-green-600 text-white rounded-lg"
            >
              Add More Values
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg"
          >
            Save Data
          </button>
        </form>
      </div>
    </div>
  );
}

export default BusinessCategoryForm;
