

// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import * as XLSX from 'xlsx';

// function BusinessCategoryForm() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [columns, setColumns] = useState([]);
//   const [rows, setRows] = useState([{}]);
//   const [loading, setLoading] = useState(true);
//   const [categoryData, setCategoryData] = useState({});
//   const [file, setFile] = useState(null); // Store the uploaded file

//   useEffect(() => {
//     axios.get(`http://localhost:4000/api/businessAdmin/getCategoryvalue/${id}`)
//       .then((response) => {
//         const columnData = response.data.columnMapping || [];
//         setColumns(columnData);
//         setCategoryData(response.data);
        
//         const initialRows = [{ ...columnData.reduce((acc, col) => {
//           const columnKey = Object.keys(col)[0];
//           acc[columnKey] = '';
//           return acc;
//         }, {}) }];
//         setRows(initialRows);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching category columns:', error);
//         alert('Error fetching category data. Please try again later.');
//         setLoading(false);
//       });
//   }, [id]);

//   const handleInputChange = (e, columnKey, rowIndex) => {
//     const { value } = e.target;
//     const updatedRows = [...rows];
//     updatedRows[rowIndex][columnKey] = value;
//     setRows(updatedRows);
//   };

//   const handleAddRow = () => {
//     setRows([...rows, { ...columns.reduce((acc, col) => {
//       const columnKey = Object.keys(col)[0];
//       acc[columnKey] = '';
//       return acc;
//     }, {}) }]);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const formattedData = rows.map(row => {
//       return columns.map((column) => {
//         const columnName = Object.keys(column)[0];
//         return { [columnName]: row[columnName] };
//       });
//     });
// console.log('formattedData',formattedData);

//     const postData = {
//       categoryId: id,
//       categoryName: categoryData.category,
//       subCategoryName: categoryData.subcategory,
//       data: formattedData,
//     };
// console.log('postData',postData);

//     axios.post('http://localhost:4000/api/businessAdmin/saveValueData', postData)
//       .then((response) => {
//         alert('Data saved successfully!');
//         navigate('/businessAdmin');
//       })
//       .catch((error) => {
//         console.error('Error saving data:', error);
//         alert('Error saving data. Please try again later.');
//       });
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     console.log('file', file);
    
//     setFile(file);
//     if (file) {
//       readExcelFile(file);
//     }
//   };

//   const readExcelFile = (file) => {
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const ab = e.target.result;
//       console.log('ab', ab);
      
//       const wb = XLSX.read(ab, { type: 'array' });
//       console.log('wb', wb);
      
//       const sheetName = wb.SheetNames[0];
//       const sheet = wb.Sheets[sheetName];
//       console.log('sheet', sheet);
      
//       const data = XLSX.utils.sheet_to_json(sheet);
//       console.log('data', data);
      
//       processExcelData(data);
//     };
//     reader.readAsArrayBuffer(file);
//   };

  // const processExcelData = (data) => {
  //   // Create a mapping of column names from Excel data to form columns
  //   const formattedRows = data.map((row) => {
  //     const newRow = {};
  
  //     // Iterate through columns and map Excel data to the newRow
  //     columns.forEach((col) => {
  //       const columnKey = Object.keys(col)[0]; // This will get the column key like 'column_2', 'column_8', etc.
  //       const columnName = col[columnKey]; // Get the actual column name (ID, NAME, ROLE)
  
  //       // Here we match the column key from Excel data to the correct columnKey
  //       // Assuming the Excel file has the exact column headers as the keys (like 'ID', 'NAME', 'ROLE')
  //       // If the Excel column matches one of our form columns, we assign the value
  //       newRow[columnKey] = row[columnName] || ''; // Map Excel data to the row or set empty string if data is missing
  //     });
  
  //     return newRow;
  //   });
  
  //   setRows(formattedRows); // Set rows with the Excel data
  //   console.log('formattedRows', formattedRows);
  // };
  
// console.log('columns',columns);
// console.log('rows',rows);


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
//           {/* File Upload Button */}
//           <div className="flex justify-center mb-4">
//             <input
//               type="file"
//               accept=".xlsx, .xls,.csv,.json"
//               onChange={handleFileChange}
//               className="px-6 py-2 bg-blue-600 text-white rounded-lg"
//             />
//           </div>

//           {/* Table Structure for Input */}
//           <table className="w-full table-auto border-collapse">
//             <thead>
//               <tr>
//                 {columns.map((column, index) => {
//                   const columnName = Object.values(column)[0];
//                   return (
//                     <th key={index} className="px-4 py-2 text-left text-gray-300">
//                       {columnName}
//                     </th>
//                   );
//                 })}
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
//                           value={row[columnKey] || ''}  // Fill input with data from the row
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

//           <div className="mt-4">
//             <button
//               type="button"
//               onClick={handleAddRow}
//               className="px-6 py-2 bg-green-600 text-white rounded-lg"
//             >
//               Add More Values
//             </button>
//           </div>

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
import * as XLSX from 'xlsx';

function BusinessCategoryForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([{}]);
  const [loading, setLoading] = useState(true);
  const [categoryData, setCategoryData] = useState({});
  const [file, setFile] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:4000/api/businessAdmin/getCategoryvalue/${id}`)
      .then((response) => {
        const columnData = response.data.columnMapping || [];
        setColumns(columnData);
        setCategoryData(response.data);

        const initialRows = [{ ...columnData.reduce((acc, col) => {
          const columnKey = Object.keys(col)[0];
          acc[columnKey] = '';
          return acc;
        }, {}) }];
        setRows(initialRows);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching category columns:', error);
        alert('Error fetching category data. Please try again later.');
        setLoading(false);
      });
  }, [id]);

  const handleInputChange = (e, columnKey, rowIndex) => {
    const { value } = e.target;
    const updatedRows = [...rows];
    updatedRows[rowIndex][columnKey] = value;
    setRows(updatedRows);
  };

  const handleAddRow = () => {
    setRows([...rows, { ...columns.reduce((acc, col) => {
      const columnKey = Object.keys(col)[0];
      acc[columnKey] = '';
      return acc;
    }, {}) }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedData = rows.map(row => {
      return columns.map((column) => {
        const columnName = Object.keys(column)[0];
        return { [columnName]: row[columnName] };
      });
    });
console.log('submit formattedData',formattedData);

    const postData = {
      categoryId: id,
      categoryName: categoryData.category,
      subCategoryName: categoryData.subcategory,
      data: formattedData,
    };
console.log('postData',postData);

    axios.post('http://localhost:4000/api/businessAdmin/saveValueData', postData)
      .then((response) => {
        alert('Data saved successfully!');
        navigate('/businessAdmin');
      })
      .catch((error) => {
        console.error('Error saving data:', error);
        alert('Error saving data. Please try again later.');
      });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log('file', file);
    
    setFile(file);
    if (file) {
      const fileExtension = file.name.split('.').pop().toLowerCase();
      
      if (fileExtension === 'xlsx' || fileExtension === 'xls' || fileExtension === 'csv') {
        readExcelFile(file);  // Call readExcelFile for Excel files
      } else if (fileExtension === 'json') {
        readJsonFile(file);   // Call readJsonFile for JSON files
      } else {
        alert('Unsupported file type. Please upload an Excel or JSON file.');
      }
    }
  };

const readExcelFile = (file) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    const ab = e.target.result;
    console.log('ab', ab);
    
    const wb = XLSX.read(ab, { type: 'array' });
    console.log('wb', wb);
    
    const sheetName = wb.SheetNames[0];
    const sheet = wb.Sheets[sheetName];
    console.log('sheet', sheet);
    
    const data = XLSX.utils.sheet_to_json(sheet);
    console.log('data', data);
    
    processExcelData(data);
  };
  reader.readAsArrayBuffer(file);
};

const processExcelData = (data) => {
  // Flag to ensure the alert is only shown once
  let alertShown = false;
  let stopProcessing = false; // Flag to stop processing

  // Create a mapping of column names from Excel data to form columns
  const formattedRows = data.map((row) => {
    if (stopProcessing) return;  // If the process is stopped, return without adding any rows

    const newRow = {};

    // Iterate through columns and map Excel data to the newRow
    columns.forEach((col) => {
      const columnKey = Object.keys(col)[0]; // This will get the column key like 'column_2', 'column_8', etc.
      const columnName = col[columnKey]; // Get the actual column name (ID, NAME, ROLE)
      console.log('columnKey', columnKey);
      console.log('columnName', columnName);

      // Check if the Excel row contains the column name (if not, alert the user)
      if (!(columnName in row)) {
        // Show alert only once
        if (!alertShown) {
          alert(`Column "${columnName}" not found in the uploaded Excel file. Please ensure the column exists.`);
          alertShown = true; // Set the flag to true after the alert has been shown
          stopProcessing = true; // Set the flag to stop further processing
        }
        console.error(`Column "${columnName}" not found in the Excel data!`);
      }

      // Here we match the column key from Excel data to the correct columnKey
      // Assuming the Excel file has the exact column headers as the keys (like 'ID', 'NAME', 'ROLE')
      newRow[columnKey] = row[columnName] || ''; // Map Excel data to the row or set empty string if data is missing
    });
    console.log('excelnewRow', newRow);

    return newRow;
  });

  if (stopProcessing) {
    // If processing was stopped, don't set the rows and log the issue
    console.error('Excel data processing aborted due to column mismatch.');
    return;
  }

  setRows(formattedRows); // Set rows with the Excel data
  console.log('excel formattedRows', formattedRows);
};

  // Function to read and process the JSON file
  const readJsonFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);  // Parse JSON file content
        console.log('JSON data:', data);
        processJsonData(data);
      } catch (error) {
        console.error('Error reading JSON file:', error);
        alert('Invalid JSON file. Please upload a valid JSON file.');
      }
    };
    reader.readAsText(file);  // Read the file as text
  };



  const processJsonData = (data) => {
    // Flag to ensure the alert is only shown once
    let alertShown = false;
    let stopProcessing = false; // Flag to stop processing
  
    // Check if the data is in the expected format (array of objects)
    if (!Array.isArray(data)) {
      alert('Invalid JSON format. It should be an array of objects.');
      return;
    }
  
    // Create a mapping of column names from the form to the JSON data
    const formattedRows = data.map((row) => {
      if (stopProcessing) return;  // If processing is stopped, return without adding any rows
  
      const newRow = {};
  
      // Iterate through columns and map the JSON data to the newRow
      columns.forEach((col) => {
        const columnKey = Object.keys(col)[0]; // This will get the column key like 'column_2', 'column_8', etc.
        const columnName = col[columnKey]; // Get the actual column name (ID, NAME, ROLE)
        console.log('columnKey', columnKey);
        console.log('columnName', columnName);
  
        // Check if the JSON row contains the column name (if not, alert the user)
        if (!(columnName in row)) {
          // Show alert only once
          if (!alertShown) {
            alert(`Column "${columnName}" not found in the uploaded JSON file. Please ensure the column exists.`);
            alertShown = true; // Set the flag to true after the alert has been shown
            stopProcessing = true; // Set the flag to stop further processing
          }
          console.error(`Column "${columnName}" not found in the JSON data!`);
        }
  
        // Here we match the column key from the JSON data to the correct columnKey
        // If the column exists in JSON, assign the value to the new row
        newRow[columnKey] = row[columnName] || ''; // Map JSON data to the row or set empty string if data is missing
      });
  
      return newRow; // Return the newly created row
    });
  
    if (stopProcessing) {
      // If processing was stopped, don't set the rows and log the issue
      console.error('JSON data processing aborted due to column mismatch.');
      return;
    }
  
    setRows(formattedRows);  // Set rows from the JSON data
    console.log('formattedRows from JSON:', formattedRows);
  };
  
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
          <div className="flex justify-center mb-4">
            <input
              type="file"
              accept=".xlsx, .xls, .json,.csv"
              onChange={handleFileChange}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg"
            />
          </div>

          <table className="w-full table-auto border-collapse">
            <thead>
              <tr>
                {columns.map((column, index) => {
                  const columnName = Object.values(column)[0];
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

          <div className="mt-4">
            <button
              type="button"
              onClick={handleAddRow}
              className="px-6 py-2 bg-green-600 text-white rounded-lg"
            >
              Add More Values
            </button>
          </div>

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
