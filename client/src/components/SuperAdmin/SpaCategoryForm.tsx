
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SpaCategoryForm() {
  const { id } = useParams(); // Get category ID from URL
  const navigate = useNavigate();
  const [columns, setColumns] = useState([]);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);


  //get Full data

  useEffect(()=>{
    axios.get(`http://localhost:3000/api/superAdmin/getCategoryColumns/${id}`)

  },[])
  // Fetch category data and column mapping from API
  useEffect(() => {
    axios.get(`http://localhost:3000/api/superAdmin/getCategoryColumns/${id}`)
      .then((response) => {
        let columnData = [];

       
        // Check if columnMapping is a string and parse it, otherwise use it directly
        if (typeof response.data.columnMapping === 'string') {
          try {
            columnData = JSON.parse(response.data.columnMapping).columnMapping;
          } catch (error) {
            console.error('Error parsing columnMapping:', error);
          }
        } else {
          columnData = response.data.columnMapping?.columnMapping || [];
        }

        // Ensure columnData is an array
        columnData = Array.isArray(columnData) ? columnData : [];

        setColumns(columnData); // Set columns to the parsed array
        setFormData(
          columnData.reduce((acc, col) => {
            Object.keys(col).forEach(key => {
              acc[key] = { key: '', value: '' }; // Initialize each column with key and value
            });
            return acc;
          }, {})
        );
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching category columns:', error);
        setLoading(false);
      });
  }, [id]);

  // Handle input change for key and value
  const handleInputChange = (e, columnKey, field) => {
    const { value } = e.target;
    const newFormData = { ...formData };
    newFormData[columnKey][field] = value; // Update key or value for the column
    setFormData(newFormData);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Prepare data for submission
    const formattedData = Object.keys(formData).reduce((acc, columnKey) => {
      const { key, value } = formData[columnKey];
      if (key && value) {
        acc[columnKey] = { [key]: value }; // Format as key-value pair
      }
      return acc;
    }, {});

    // Wrap the formatted data inside columnMapping
    const finalData = { columnMapping: Object.entries(formattedData).map(([columnKey, data]) => ({
      [columnKey]: data
    })) };

    // Send the data to the backend
    axios.post('http://localhost:3000/api/superAdmin/saveData', {
      categoryId: id,
      data: finalData,
    })
      .then((response) => {
        alert('Data saved successfully!');
        navigate('/'); // Redirect to home page after saving
      })
      .catch((error) => {
        console.error('Error saving data:', error);
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
        <h2 className="text-4xl font-bold text-center text-gray-100">Add Data to Category {id}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Render columns and allow users to add column name and values */}
          {columns.map((column, index) => (
            <div key={index} className="space-y-2">
              {Object.keys(column).map((columnKey) => (
                <div key={columnKey} className="space-y-2">
                  <label className="text-lg text-gray-300">Column: {columnKey}</label>

                  <div className="flex flex-col space-y-2">
                    {/* Input for Key */}
                    <input
                      type="text"
                      name={`${columnKey}-key`}
                      value={formData[columnKey]?.key || ''}
                      onChange={(e) => handleInputChange(e, columnKey, 'key')}
                      className="w-full p-2 rounded-lg bg-gray-700 text-white"
                      placeholder={`Enter Name for ${columnKey}`}
                    />

                    {/* Input for Value */}
                    <input
                      type="text"
                      name={`${columnKey}-value`}
                      value={formData[columnKey]?.value || ''}
                      onChange={(e) => handleInputChange(e, columnKey, 'value')}
                      className="w-full p-2 rounded-lg bg-gray-700 text-white"
                      placeholder={`Enter value for ${columnKey}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
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

export default SpaCategoryForm;