import React, { useState } from 'react';
import axios, { AxiosError } from 'axios'; // Import AxiosError
import { useAuth } from '../../providers/auth-provider';
import { useNavigate } from 'react-router-dom';

// Define types for form data
interface FormData {
  email: string;
  password: string;
  role: string;
}

const Login: React.FC = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    role: '',
  });
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null); // Reset previous error message

    try {
      const response = await axios.post('http://localhost:3000/api/authentication/login', formData, { withCredentials: true });
      console.log('Login success:', response.data);
      
      if (response && response.data) {
        const { user } = response.data;
        login(user);

        const roleToRouteMapping: Record<string, string> = {
          superAdmin: '/superAdminDashboard',
        };

        const userRole = response.data.user.role;
        const redirectRoute = roleToRouteMapping[userRole] || '/login'; // Default route if role is not in the mapping

        navigate(redirectRoute);
      }
    } catch (error: AxiosError | any) {
      // Ensure the error is typed correctly
      setErrorMessage(error.response?.data?.error || 'Something went wrong');
      console.error('Error during login:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Left Side */}
      <div className="flex flex-1 justify-center items-center flex-col text-white">
        <h1 className="text-4xl font-bold text-blue-500 mb-4">Master Configuration</h1>
        <p className="text-lg text-gray-400 text-center">"Powerful and Flexible Management System"</p>
      </div>

      {/* Right Side */}
      <div className="flex flex-1 justify-center items-center bg-gray-800">
        <div className="bg-gray-700 p-8 rounded-lg shadow-lg w-full max-w-md">
          {/* Heading (Login) */}
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Login</h2>

          {/* Error Message */}
          {errorMessage && <div className="mb-4 text-red-500 text-center">{errorMessage}</div>}

          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm text-white mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 text-white bg-gray-600 border border-gray-500 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm text-white mb-2">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 text-white bg-gray-600 border border-gray-500 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Role Selection */}
            <div className="mb-6">
              <label htmlFor="role" className="block text-sm text-white mb-2">Role</label>
              <select
                name="role"
                id="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-3 text-white bg-gray-600 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="SuperAdmin">SuperAdmin</option>
                <option value="TechnicalAdmin">TechnicalAdmin</option>
                <option value="BusinessAdmin">Business Admin</option>
                <option value="User">User</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
