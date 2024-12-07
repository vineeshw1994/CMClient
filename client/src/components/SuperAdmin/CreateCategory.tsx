import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateCategory = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [columns, setColumns] = useState([]); // Store selected columns
  const [currentStep, setCurrentStep] = useState(1); // Track the step (1 = column selection, 2 = value input)
  const [columnValues, setColumnValues] = useState({}); // Store values for selected columns
  const [columnList, setColumnList] = useState([]); // Store columns dynamically from backend

  useEffect(() => {
    // Fetch columns dynamically from the backend
    const fetchColumns = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/superAdmin/columnList'); // Backend API endpoint to fetch columns
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

  const handleSubmit = () => {
    // Construct the column mapping from selected columns and their values
    const columnMapping = columns.map((column) => {
      return {
        [column]: columnValues[column] ? columnValues[column] : '' // Use empty string if no value is provided
      };
    });

    const metadataObject = {
      category,
      subcategory,
      columnMapping, // Constructed columnMapping object
    };

    // Save the metadata to localStorage
    if (category) {
      localStorage.setItem(category, JSON.stringify(metadataObject)); // Save the metadata object using the category name as the key
      console.log('Metadata saved to localStorage:', metadataObject);
      navigate('/SpaListCategory'); // Navigate to the next page after saving the data
    } else {
      alert('Please provide a category name.');
    }
  };

  return (
    <div className="min-h-80 bg-gray-900 text-white flex items-center justify-center py-8">
      <div className="w-full bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-6">Create Category</h2>

        {/* Category Input */}
        <div className="flex items-center space-x-4 mb-4">
          <label htmlFor="category" className="text-lg">Category</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={handleCategoryChange}
            placeholder="Enter category name"
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>

        {/* Subcategory Input */}
        <div className="flex items-center space-x-4 mb-4">
          <label htmlFor="subcategory" className="text-lg mb-2">Subcategory</label>
          <input
            type="text"
            id="subcategory"
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            placeholder="Enter subcategory (optional)"
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>

        {/* Columns Section */}
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
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
