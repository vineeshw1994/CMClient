import React from 'react'

import Sidebar from '../../components/sidebar/Sidebar';

export const SuperAdminPage = () => {
    return (
        <div className="flex bg-gray-900 text-white h-screen">
          {/* Sidebar */}
          <Sidebar />
    
          <div className="flex-1 flex flex-col">
            {/* Navbar */}
            {/* <Navbar /> */}
    
            <div className="p-8">
              <h1 className="text-3xl font-semibold underline mb-4">Hello</h1>
              {/* <SampleComponent /> */}
            </div>
          </div>
        </div>
      );
}
