import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';

interface Column {
  column: string;
  selected: boolean;
}

export const CreateCategory: React.FC = () => {
  const [category, setCategory] = useState<string>('');
  const [subcategory, setSubcategory] = useState<string>('');
  const [columns, setColumns] = useState<boolean[]>(new Array(30).fill(false)); // Columns as an array of booleans

  const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setCategory(e.target.value);
  };

  const handleSubcategoryChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSubcategory(e.target.value);
  };

  const handleCheckboxChange = (index: number): void => {
    const newColumns = [...columns];
    newColumns[index] = !newColumns[index]; // Toggle checkbox value
    setColumns(newColumns);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const data = {
      category,
      subcategory,
      columns: columns.map((checked, index) => ({
        column: `Column ${index + 1}`,
        selected: checked,
      })),
    };

    try {
      const response = await axios.post('/api/category/create', data);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-80   bg-gray-900 text-white flex items-center justify-center py-8">
      <div className=" w-full bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-6">Create Category</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category Input */}
          <div className="flex items-center space-x-4 mb-4">
            <label htmlFor="category" className="text-lg">Category</label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={handleCategoryChange}
              placeholder="Enter category name"
              className="p-2 border border-gray-700 text-gray-700 rounded-md w-full"
              required
            />
          </div>

          {/* Subcategory Input */}
          <div className="flex items-center space-x-4 mb-4">
            <label htmlFor="subcategory" className="text-lg mb-2">Subcategory</label>
            <input
              type="text"
              id="subcategory"
              value={subcategory}
              onChange={handleSubcategoryChange}
              placeholder="Enter subcategory name (optional)"
              className="p-2 border border-gray-700 text-gray-700 rounded-md w-full"
            />
          </div>

          {/* Columns Section */}
          <div>
            <label className="text-lg mb-2">Columns</label>
            <div className="grid grid-cols-5 gap-4">
              {columns.slice(0, 30).map((checked, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => handleCheckboxChange(index)}
                    className="mr-2 w-5 h-5 text-blue-600 border-gray-700 focus:ring-blue-500 focus:ring-2"
                  />
                  <label>Column {index + 1}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="py-3 px-8 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
