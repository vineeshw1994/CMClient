
// import React, { useState } from 'react';

// const TechnicalCreateCategory = () => {
//   const [category, setCategory] = useState('');
//   const [subcategory, setSubcategory] = useState('');
//   const [columns, setColumns] = useState([]);
//   const [metadata, setMetadata] = useState(null);

//   const categories = ['Technology', 'Science', 'Engineering', 'Mathematics'];
//   const subcategories = {
//     Technology: ['Software', 'Hardware', 'Networking'],
//     Science: ['Physics', 'Chemistry', 'Biology'],
//     Engineering: ['Mechanical', 'Civil', 'Electrical'],
//     Mathematics: ['Applied Math', 'Pure Math'],
//   };

//   const columnsList = Array.from({ length: 30 }, (_, index) => `Column_${index + 1}`);

//   const handleCategoryChange = (e) => {
//     setCategory(e.target.value);
//     setSubcategory(''); // Reset subcategory when category changes
//   };

//   const handleColumnSelection = (e) => {
//     const value = e.target.value;
//     if (e.target.checked) {
//       setColumns((prev) => [...prev, value]);
//     } else {
//       setColumns(columns.filter((column) => column !== value));
//     }
//   };

//   const handleSubmit = () => {
//     const metadataObject = {
//       category,
//       subcategory,
//       columns,
//     };
//     setMetadata(metadataObject);
//     // Send to backend (e.g., via fetch or axios)
//     console.log('Metadata saved:', metadataObject);
//   };

//   return (
//     <div className="bg-gray-900 text-white min-h-screen flex justify-center items-center py-12 px-6">
//       <div className="max-w-4xl w-full p-8 bg-gray-800 rounded-xl shadow-lg space-y-8">
//         <h2 className="text-4xl font-bold text-center text-gray-100">Create New Category</h2>

//         {/* Category Input */}
//         <div className="space-y-4">
//           <label htmlFor="category" className="block text-lg text-gray-300">Category</label>
//           <input
//             type="text"
//             id="category"
//             value={category}
//             onChange={handleCategoryChange}
//             placeholder="Enter category name"
//             className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
//           />
//         </div>

//         {/* Subcategory Input (Conditional) */}
//         {category && (
//           <div className="space-y-4">
//             <label htmlFor="subcategory" className="block text-lg text-gray-300">Subcategory (Optional)</label>
//             <input
//               type="text"
//               id="subcategory"
//               value={subcategory}
//               onChange={(e) => setSubcategory(e.target.value)}
//               placeholder="Enter subcategory (optional)"
//               className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
//             />
//           </div>
//         )}

//         {/* Column Selection */}
//         <div className="space-y-4">
//           <label className="block text-lg text-gray-300">Select Columns</label>
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//             {columnsList.map((column) => (
//               <div key={column} className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   id={column}
//                   value={column}
//                   onChange={handleColumnSelection}
//                   className="h-5 w-5 text-blue-500 border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 transition-all"
//                 />
//                 <label htmlFor={column} className="text-gray-300">{column}</label>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Submit Button */}
//         <div className="flex justify-center mt-6">
//           <button
//             onClick={handleSubmit}
//             className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105"
//           >
//             Save Metadata
//           </button>
//         </div>

//         {/* Show Metadata (Optional for Debugging) */}
//         {metadata && (
//           <div className="mt-8 p-4 bg-gray-700 border border-gray-600 rounded-md">
//             <h3 className="text-xl font-semibold text-gray-100">Metadata</h3>
//             <pre className="text-gray-300">{JSON.stringify(metadata, null, 2)}</pre>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TechnicalCreateCategory;

// import React, { useState } from 'react';

// const TechnicalCreateCategory = () => {
//   const [category, setCategory] = useState('');
//   const [subcategory, setSubcategory] = useState('');
//   const [columns, setColumns] = useState([]);
//   const [columnValues, setColumnValues] = useState({}); // Store values for selected columns
//   const [metadata, setMetadata] = useState(null);

//   const categories = ['Technology', 'Science', 'Engineering', 'Mathematics'];
//   const subcategories = {
//     Technology: ['Software', 'Hardware', 'Networking'],
//     Science: ['Physics', 'Chemistry', 'Biology'],
//     Engineering: ['Mechanical', 'Civil', 'Electrical'],
//     Mathematics: ['Applied Math', 'Pure Math'],
//   };

//   const columnsList = Array.from({ length: 30 }, (_, index) => `Column_${index + 1}`);

//   const handleCategoryChange = (e) => {
//     setCategory(e.target.value);
//     setSubcategory(''); // Reset subcategory when category changes
//   };

//   const handleColumnSelection = (e) => {
//     const value = e.target.value;
//     if (e.target.checked) {
//       setColumns((prev) => [...prev, value]);
//       setColumnValues((prev) => ({ ...prev, [value]: '' })); // Initialize value for selected column
//     } else {
//       setColumns(columns.filter((column) => column !== value));
//       const newColumnValues = { ...columnValues };
//       delete newColumnValues[value]; // Remove the value for unselected column
//       setColumnValues(newColumnValues);
//     }
//   };

//   const handleColumnValueChange = (e, column) => {
//     setColumnValues((prev) => ({
//       ...prev,
//       [column]: e.target.value, // Update the value for the specific column
//     }));
//   };

//   const handleSubmit = () => {
//     const metadataObject = {
//       category,
//       subcategory,
//       columns,
//       columnValues, // Include the column values in the metadata object
//     };
//     setMetadata(metadataObject);
//     // Send to backend (e.g., via fetch or axios)
//     console.log('Metadata saved:', metadataObject);
//   };

//   return (
//     <div className="bg-gray-900 text-white min-h-screen flex justify-center items-center py-12 px-6">
//       <div className="max-w-4xl w-full p-8 bg-gray-800 rounded-xl shadow-lg space-y-8">
//         <h2 className="text-4xl font-bold text-center text-gray-100">Create New Category</h2>

//         {/* Category Input */}
//         <div className="space-y-4">
//           <label htmlFor="category" className="block text-lg text-gray-300">Category</label>
//           <input
//             type="text"
//             id="category"
//             value={category}
//             onChange={handleCategoryChange}
//             placeholder="Enter category name"
//             className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
//           />
//         </div>

//         {/* Subcategory Input (Conditional) */}
//         {category && (
//           <div className="space-y-4">
//             <label htmlFor="subcategory" className="block text-lg text-gray-300">Subcategory (Optional)</label>
//             <input
//               type="text"
//               id="subcategory"
//               value={subcategory}
//               onChange={(e) => setSubcategory(e.target.value)}
//               placeholder="Enter subcategory (optional)"
//               className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
//             />
//           </div>
//         )}

//         {/* Column Selection */}
//         <div className="space-y-4">
//           <label className="block text-lg text-gray-300">Select Columns</label>
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//             {columnsList.map((column) => (
//               <div key={column} className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   id={column}
//                   value={column}
//                   onChange={handleColumnSelection}
//                   className="h-5 w-5 text-blue-500 border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 transition-all"
//                 />
//                 <label htmlFor={column} className="text-gray-300">{column}</label>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Input Fields for Selected Columns */}
//         {columns.length > 0 && (
//           <div className="space-y-4">
//             <label className="block text-lg text-gray-300">Enter Values for Selected Columns</label>
//             {columns.map((column) => (
//               <div key={column} className="flex flex-col space-y-2">
//                 <label htmlFor={column} className="text-gray-300">{column}</label>
//                 <input
//                   type="text"
//                   id={column}
//                   value={columnValues[column] || ''}
//                   onChange={(e) => handleColumnValueChange(e, column)}
//                   placeholder={`Enter value for ${column}`}
//                   className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
//                 />
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Submit Button */}
//         <div className="flex justify-center mt-6">
//           <button
//             onClick={handleSubmit}
//             className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105"
//           >
//             Save Metadata
//           </button>
//         </div>

//         {/* Show Metadata (Optional for Debugging) */}
//         {metadata && (
//           <div className="mt-8 p-4 bg-gray-700 border border-gray-600 rounded-md">
//             <h3 className="text-xl font-semibold text-gray-100">Metadata</h3>
//             <pre className="text-gray-300">{JSON.stringify(metadata, null, 2)}</pre>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TechnicalCreateCategory;


import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TechnicalCreateCategory = () => {
  const navigate = useNavigate();

  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [columns, setColumns] = useState([]); // Store selected columns
  const [currentStep, setCurrentStep] = useState(1); // Track the step (1 = column selection, 2 = value input)
  const [columnValues, setColumnValues] = useState({}); // Store values for selected columns
  const [metadata, setMetadata] = useState(null);
  const [columnList, setColumnList] = useState([]); // Store columns dynamically from backend



  // const columnsList = Array.from({ length: 30 }, (_, index) => `Column_${index + 1}`);


  useEffect(() => {
    // Fetch columns dynamically from the backend
    const fetchColumns = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/teachnical/columnList'); // Backend API endpoint to fetch columns
        setColumnList(response.data.columns); // Set the column list
        
      } catch (error) {
        console.error('Error fetching columns:', error);
      }
    };
    
    fetchColumns(); // Fetch columns when the component mounts
  }, []);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setSubcategory(''); // Reset subcategory when category changes
  };

  const handleColumnSelection = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setColumns((prev) => [...prev, value]);
    } else {
      setColumns(columns.filter((column) => column !== value));
    }
  };

  const handleColumnValueChange = (e, column) => {
    setColumnValues((prev) => ({
      ...prev,
      [column]: e.target.value, // Update the value for the specific column
    }));
  };

  // const handleNextStep = () => {
  //   setCurrentStep(2); // Move to the next step where values are entered
  // };

  // const handleSubmit = async () => {
  //   const metadataObject = {
  //     category,
  //     subcategory,
  //     columns,
  //     columnValues, // Include the column values in the metadata object
  //   };
  //   try {
  //     // Send data to backend API
  //     const response = await axios.post('http://localhost:4000/api/teachnical/saveCategory', metadataObject);
  //     console.log('Metadata saved:', response.data); // Handle the response as needed
  //     setMetadata(response.data); // Optionally set the metadata to display it
  //   } catch (error) {
  //     console.error('Error saving metadata:', error);
  //   }
  // };

  const handleSubmit = async () => {
    // Construct the column mapping from selected columns and their values
    const columnMapping = columns.map((column) => {
      return {
        [column]: columnValues[column] ? columnValues[column] : ''
      };
    });
  
    const metadataObject = {
      category,
      subcategory,
      // columns,
      columnMapping, // Constructed columnMapping object
    };
    if (category) {
      localStorage.setItem(category, JSON.stringify(metadataObject)); // Save the metadata object using the category name as the key
      console.log('Metadata saved to localStorage:', metadataObject);
      navigate('/technicalcategorylist'); // Navigate to the next page after saving the data
    } else {
      alert('Please provide a category name.');
    }
  
    // try {
    //   // Send data to backend API
    //   const response = await axios.post('http://localhost:3000/api/teachnical/saveCategory', metadataObject);
    //   console.log('Metadata saved:', response.data); // Handle the response as needed
    //   setMetadata(response.data); // Optionally set the metadata to display it
    // } catch (error) {
    //   console.error('Error saving metadata:', error);
    // }
  };
  return (
    <div className="bg-gray-900 text-white min-h-screen flex justify-center items-center py-12 px-6">
      <div className="max-w-4xl w-full p-8 bg-gray-800 rounded-xl shadow-lg space-y-8">
        <h2 className="text-4xl font-bold text-center text-gray-100">Create New Category</h2>

        {/* Category Input */}
        <div className="space-y-4">
          <label htmlFor="category" className="block text-lg text-gray-300">Category</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={handleCategoryChange}
            placeholder="Enter category name"
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>

        {/* Subcategory Input (Conditional) */}
        {category && (
          <div className="space-y-4">
            <label htmlFor="subcategory" className="block text-lg text-gray-300">Subcategory (Optional)</label>
            <input
              type="text"
              id="subcategory"
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              placeholder="Enter subcategory (optional)"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
        )}

        {/* Step 1: Column Selection */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <label className="block text-lg text-gray-300">Select Columns</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {columnList.map((column) => (
                <div key={column} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={column}
                    value={column}
                    onChange={handleColumnSelection}
                    className="h-5 w-5 text-blue-500 border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                  <label htmlFor={column} className="text-gray-300">{column}</label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Enter Values for Selected Columns */}
        {currentStep === 2 && columns.length > 0 && (
          <div className="space-y-4">
            <label className="block text-lg text-gray-300">Enter Values for Selected Columns</label>
            {columns.map((column) => (
              <div key={column} className="flex flex-col space-y-2">
                <label htmlFor={column} className="text-gray-300">{column}</label>
                <input
                  type="text"
                  id={column}
                  value={columnValues[column] || ''}
                  onChange={(e) => handleColumnValueChange(e, column)}
                  placeholder={`Enter value for ${column}`}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
            ))}
          </div>
        )}

    
        {/* Submit Button */}
         <div className="flex justify-center mt-6">
          <button
           onClick={handleSubmit}
            className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Save Metadata
         </button>
        </div>


        {/* Show Metadata (Optional for Debugging) */}
        {metadata && (
          <div className="mt-8 p-4 bg-gray-700 border border-gray-600 rounded-md">
            <h3 className="text-xl font-semibold text-gray-100">Metadata</h3>
            <pre className="text-gray-300">{JSON.stringify(metadata, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default TechnicalCreateCategory;
