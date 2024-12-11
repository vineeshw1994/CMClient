import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';

export const ColumnAddData = () => {
  const navigate = useNavigate();

  const { id } = useParams(); // Get the category ID from URL parameters
  const [categoryData, setCategoryData] = useState(null); // To store category data
  const [inputData, setInputData] = useState([]); // To store user input for the table
  const [loading, setLoading] = useState(true); // To handle loading state

  // Fetch category data using the category ID
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/superAdmin/getCategoryData/${id}`);
        const data = response.data;
        console.log('data',data)
        if (data) {
          setCategoryData(data);

          // Initialize with a single empty row based on the column mapping
          const initialInputData = data.columnMapping.reduce((acc, column) => {
            const columnName = Object.values(column)[0]; // Get the column value (like "Id", "Name", etc.)
            acc[columnName] = ''; // Initialize empty value for each column
            return acc;
          }, {});

          // Start with one empty row
          setInputData([initialInputData]);
        } else {
          alert('Category not found');
        }
      } catch (error) {
        console.error('Error fetching category data:', error);
        alert('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [id]); // Fetch data when the component mounts

  // Handle input changes in the table cells
  const handleInputChange = (e, rowIndex, column) => {
    const { value } = e.target;
    const updatedData = [...inputData];
    updatedData[rowIndex][column] = value;
    setInputData(updatedData);
  };

  // Handle form submission (saving data)
  const handleSave = async () => {
    try {
      // Log inputData before making the API call to verify structure
      console.log('Data to be sent to the backend:', inputData);

      const response = await axios.post('http://localhost:3000/api/superAdmin/saveColumnData', {
        categoryId: id,
        categoryData: categoryData,
        columnData: inputData, // Send the data as it is
      });

      console.log('Data saved successfully:', response.data);
      
      navigate(`/spaListDatasPage/${id}`)
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Error saving data');
    }
  };

  // Add a new row for user input
  const handleAddRow = () => {
    // Create an empty row where all columns are empty
    const newRow = categoryData.columnMapping.reduce((acc, column) => {
      const columnName = Object.values(column)[0];
      acc[columnName] = ''; // Initialize empty value for each column
      return acc;
    }, {});

    setInputData([...inputData, newRow]); // Add new row to the inputData state
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-lg text-white">Loading...</span>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg space-y-6">
        {/* Category name and subcategory */}
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-100">{categoryData.category}</h1>
          <h2 className="text-2xl text-gray-400 mt-2">{categoryData.subcategory}</h2>
          
          
        </div>

        {/* Table to display column names and user inputs */}
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full bg-gray-700 rounded-lg shadow-lg">
            <thead>
              <tr>
                {categoryData.columnMapping.map((column, index) => {
                  const columnName = Object.values(column)[0]; // Get the value of the object (e.g., "Id", "Name")
                  return (
                    <th key={index} className="px-6 py-3 text-left text-lg text-gray-300">
                      {columnName}
                    </th>
                  );
                })}
                {/* Empty header cell for the Add button */}
                <th className="px-6 py-3 text-left text-lg text-gray-300">
                  <button
                    onClick={handleAddRow}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Add Row
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {inputData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {categoryData.columnMapping.map((column, colIndex) => {
                    const columnName = Object.values(column)[0];
                    return (
                      <td key={colIndex} className="px-6 py-4">
                        <input
                          type="text"
                          value={row[columnName] || ''}
                          onChange={(e) => handleInputChange(e, rowIndex, columnName)}
                          className="w-full p-2 rounded-lg bg-gray-800 text-white"
                          placeholder={`Enter ${columnName}`}
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Save Button */}
        <div className="mt-6 text-center">
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
