import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios

function SpaCategoryForm() {
  const { id } = useParams(); // Get category name (id) from URL
  const navigate = useNavigate();
  const [columns, setColumns] = useState([]); // Store columns for the selected category
  const [formData, setFormData] = useState({}); // Store user input for column names
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Send the category id to the backend
        const response = await axios.get(`http://localhost:3000/api/superAdmin/getCategoryData/${id}`);
        const categoryData = response.data;
        console.log('cate',categoryData)
        if (categoryData) {
          const columnKeys = categoryData.columnMapping.map((column) => Object.keys(column)[0]);
          setColumns(columnKeys); // Set the column keys to be displayed

          // Initialize formData with keys for column names, using the column keys
          setFormData(
            columnKeys.reduce((acc, columnKey) => {
              acc[columnKey] = { name: '' }; // Initialize each column with name only
              return acc;
            }, {})
          );
        } else {
          alert('Category not found');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('Error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Handle input change for column name
  const handleInputChange = (e, columnKey, field) => {
    const { value } = e.target;
    const newFormData = { ...formData };
    newFormData[columnKey][field] = value; // Update name for the column
    setFormData(newFormData);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data for submission (map to the required format)
    const formattedData = Object.keys(formData).reduce((acc, columnKey) => {
      const { name } = formData[columnKey];
      if (name) {
        acc.push({ [columnKey]: name }); // Push the column with the name in the correct format
      }
      return acc;
    }, []);

    // Construct the full data to send to the backend
    const finalData = {
      category: id, // Include the category name (id)
      columnMapping: formattedData, // Include the column mapping (columns with their names)
    };

    // Send data to the backend using axios to save the column names
    try {
      const response = await axios.post('http://localhost:3000/api/superAdmin/saveColumnName', finalData); // Replace with your backend URL
      console.log('Data sent to backend successfully:', response.data);
      alert('Column names updated and saved successfully!');
    } catch (error) {
      console.error('Error sending data to backend:', error);
      alert('Error occurred while saving data to the backend');
    }

    navigate('/SpaListCategory'); 
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
        <h2 className="text-4xl font-bold text-center text-gray-100">Name Columns for Category: {id}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Render columns and allow users to name each column */}
          {columns.map((columnKey, index) => {
            // Dynamically set the column name based on the actual column keys from the localStorage
            const columnName = `Column ${columnKey}`; // Display the column key (e.g., 3, 5, 6)

            return (
              <div key={columnKey} className="space-y-2">
                <label className="text-lg text-gray-300">{columnName}</label>
                <div className="flex flex-col space-y-2">
                  {/* Input for Column Name */}
                  <input
                    type="text"
                    value={formData[columnKey]?.name || ''}
                    onChange={(e) => handleInputChange(e, columnKey, 'name')}
                    className="w-full p-2 rounded-lg bg-gray-700 text-white"
                    placeholder={`Enter name for ${columnName}`}
                  />
                </div>
              </div>
            );
          })}
          <button
            type="submit"
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg"
          >
            Save 
          </button>
        </form>
      </div>
    </div>
  );
}

export default SpaCategoryForm;
