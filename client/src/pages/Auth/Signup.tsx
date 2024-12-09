import React, { useState } from 'react';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    password: '',
    role: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-900 to-black">
      <div className="flex flex-col lg:flex-row w-full max-w-6xl rounded-lg shadow-xl overflow-hidden">
        {/* Left Section - Project Name and Quotes */}
        <div className="hidden lg:flex flex-1 bg-teal-900 text-white justify-center items-center p-10">
          <div className="text-center space-y-6">
            <h1 className="text-5xl font-semibold tracking-tight">MasterConfiguration</h1>
            <p className="text-xl italic">"Building the future, one configuration at a time."</p>
            <p className="text-sm">Join the most advanced platform for configuration management.</p>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="flex-1 p-8 space-y-6 bg-gray-900 text-white animate__animated animate__fadeIn">
          <h2 className="text-3xl font-semibold text-gray-100 mb-6">Create Your Account</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* First Name */}
            <div className="flex flex-col">
              <label htmlFor="firstname" className="text-gray-300">First Name</label>
              <input
                type="text"
                id="firstname"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="px-4 py-3 rounded-md border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200 ease-in-out"
                required
              />
            </div>

            {/* Last Name */}
            <div className="flex flex-col">
              <label htmlFor="lastname" className="text-gray-300">Last Name</label>
              <input
                type="text"
                id="lastname"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="px-4 py-3 rounded-md border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200 ease-in-out"
                required
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label htmlFor="email" className="text-gray-300">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="px-4 py-3 rounded-md border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200 ease-in-out"
                required
              />
            </div>

            {/* Mobile Number */}
            <div className="flex flex-col">
              <label htmlFor="mobile" className="text-gray-300">Mobile Number</label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="px-4 py-3 rounded-md border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200 ease-in-out"
                required
              />
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label htmlFor="password" className="text-gray-300">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="px-4 py-3 rounded-md border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200 ease-in-out"
                required
              />
            </div>

            {/* Role */}
            <div className="flex flex-col">
              <label htmlFor="role" className="text-gray-300">Role</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="px-4 py-3 rounded-md border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200 ease-in-out"
                required
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
                <option value="moderator">Moderator</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
