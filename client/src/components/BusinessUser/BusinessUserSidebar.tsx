import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BusinessUserSidebar = () => {
//   const [showCategories, setShowCategories] = useState(false);
  const [active, setActive] = useState(null); // Active state to highlight selected options

  // Handle setting the active state
  const handleClick = (option:any) => {
    setActive(option);
  };

  return (
    <div className="bg-gradient-to-b from-gray-800 via-gray-900 to-black text-white w-64 h-screen p-5 transition-all duration-300">

      <div className="flex flex-col space-y-6">
        <div className="text-2xl font-semibold text-center text-gray-200">Admin</div>

        {/* Dashboard Button */}
        <Link to='/BusinessUserDashboard'><button 
          className={`w-full text-left py-3 px-4 rounded-lg transition-all duration-200 ease-in-out 
            ${active === 'Dashboard' ? 'bg-indigo-900' : 'hover:bg-indigo-900'}`}
          onClick={() => handleClick('Dashboard')}
        >
          Dashboard
        </button></Link>

        {/* Categories Dropdown */}
        <div>
          <Link to='/showCategory'><button 
            className={`w-full text-left py-3 px-4 rounded-lg transition-all duration-200 ease-in-out
              ${active === 'Categories' ? 'bg-indigo-900' : 'hover:bg-indigo-900'}`}
            onClick={() => {
            //   setShowCategories(!showCategories);
              handleClick('Categories');
            }}
          >
           Show Category 
          </button></Link>
          {/* {showCategories && (
            <div className="bg-indigo-800 mt-2 rounded-lg shadow-lg transition-all duration-200">
             
                <Link to ='/technicalAdmin'><button className="py-2 px-5 hover:bg-indigo-600 cursor-pointer">Create Category</button></Link>
              
            </div>
          )} */}
        </div>

        {/* Logout Button */}
        <div 
          className="py-3 px-4 rounded-lg hover:bg-red-900 cursor-pointer transition-all duration-200"
          onClick={() => handleClick('Logout')}
        >
          Logout
        </div>
      </div>
    </div>
  );
}

export default BusinessUserSidebar;
