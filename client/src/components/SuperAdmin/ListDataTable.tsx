import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const ListDataTable = () => {
  const { id } = useParams(); // Get categoryId from URL params
  const [categoryData, setCategoryData] = useState<any>(null); // Store category metadata
  const [tableData, setTableData] = useState<any[]>([]); // Store fetched data
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  useEffect(() => {
    // Fetch the category data from backend using categoryId
    const fetchCategoryData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/superAdmin/getFullData/${id}`);
        setCategoryData(response.data); // Set metadata
        setTableData(response.data.data); // Set data from database
      } catch (error) {
        console.error('Error fetching category data:', error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchCategoryData();
  }, [id]); // Re-run if categoryId changes

  // Render a loading spinner if data is still loading
  if (loading) {
    return <div className="text-center text-gray-300">Loading...</div>;
  }

  // Check if categoryData and tableData are available
  if (!categoryData || !tableData) {
    return <div className="text-center text-gray-300">No data available</div>; // Display message if data is missing
  }

  // Get the column names from categoryData for the table headers
  const columnMapping = categoryData.data.length > 0 ? Object.keys(categoryData.data[0]) : [];

  return (
    <div className="bg-gray-900 text-white min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg space-y-6">
        {/* Category and Subcategory */}
        <div className="text-center mb-6">
          <h1 className="text-5xl font-bold text-gray-100">{categoryData.category}</h1>
          <h2 className="text-2xl text-gray-400 mt-2">{categoryData.subcategory}</h2>
        </div>

        {/* Table to display columns and data */}
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full bg-gray-700 rounded-lg shadow-lg">
            <thead className="bg-gray-600">
              <tr>
                {/* Dynamically create table headers based on columnMapping */}
                {columnMapping.map((columnName, index) => (
                  <th
                    key={index}
                    className="px-6 py-3 text-lg font-semibold text-center text-gray-300 uppercase tracking-wider"
                  >
                    {columnName} {/* Display column name */}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Dynamically create table rows based on fetched data */}
              {tableData.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-600">
                  {columnMapping.map((columnName, colIndex) => (
                    <td
                      key={colIndex}
                      className="px-6 py-4 text-center text-gray-300"
                    >
                      {/* Render the value of the column or 'N/A' if data is missing */}
                      {row[columnName] || 'N/A'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
