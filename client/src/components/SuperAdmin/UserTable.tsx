import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const UserTable = () => {
  const [users, setUsers] = useState([]);  // To store fetched users data
  const [loading, setLoading] = useState(true);  // To handle loading state

  // Fetch users data on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await axios.get('http://localhost:3000/api/superAdmin/listUsers');
        setUsers(response.data);  // Set the fetched data into state
      } catch (error) {
        console.error('Error fetching users data:', error);
      } finally {
        setLoading(false);  // Set loading to false once the data is fetched
      }
    };

    fetchUsers();  // Call the function to fetch data
  }, []);  // Empty dependency array means this effect runs only once when the component is mounted

  // Function to toggle user block/unblock status
  const toggleBlockStatus = async (userId, isBlocked) => {
    try {
      // Send request to update the user's isBlocked status
      const response = await axios.put(`http://localhost:3000/api/superAdmin/${userId}/block`, {
        isBlocked: !isBlocked,  // Toggle the isBlocked value
      });

      // Find the updated user in the users list and update the state
      const updatedUsers = users.map(user =>
        user.id === userId ? { ...user, isBlocked: !isBlocked } : user
      );

      setUsers(updatedUsers);  // Update the users list with the new block status
      alert(response.data.message);  // Show success message
    } catch (error) {
      console.error('Error toggling block status:', error);
      alert('Error updating block status');
    }
  };

  // Loading spinner while data is being fetched
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-lg text-white">Loading...</span>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto py-4 px-6">
      <div className="max-w-7xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-100 mb-6">User Table</h1>
        
        {/* Table to display users */}
        <table className="min-w-full bg-gray-700 rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-lg text-gray-300">Sl. No</th>
              <th className="px-6 py-3 text-left text-lg text-gray-300">Name</th>
              <th className="px-6 py-3 text-left text-lg text-gray-300">Email</th>
              <th className="px-6 py-3 text-left text-lg text-gray-300">Role</th>
              <th className="px-6 py-3 text-left text-lg text-gray-300">Phone Number</th>
              <th className="px-6 py-3 text-left text-lg text-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Map through users and display each user's details */}
            {users.map((user, index) => (
              <tr key={user.id}>
                <td className="px-6 py-4 text-gray-300">{index + 1}</td>
                <td className="px-6 py-4 text-gray-300">{user.name}</td>
                <td className="px-6 py-4 text-gray-300">{user.email}</td>
                <td className="px-6 py-4 text-gray-300">{user.role}</td>
                <td className="px-6 py-4 text-gray-300">{user.phoneNumber}</td>
                <td className="px-6 py-4 text-gray-300">
                  {/* Action button (Block/Unblock) */}
                  <button
                    onClick={() => toggleBlockStatus(user.id, user.isBlocked)}
                    className={`px-4 py-2 rounded-lg ${
                      user.isBlocked ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
                    } text-white`}
                  >
                    {user.isBlocked ? 'Unblock' : 'Block'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
