import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import { ListDataTable } from '../../components/SuperAdmin/ListDataTable';


export const ListDatasPage = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <div>
        <Navbar />
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Hidden on small screens */}
        <div className="lg:w-64 w-full lg:block hidden bg-gray-800">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 lg:p-8 bg-gray-900 text-white overflow-y-auto">
          <h1 className="text-3xl font-semibold mb-6">Categories</h1>
          <ListDataTable/>
          {/* ListMetaCard Component */}
          
        </div>
      </div>
    </div>
  )
}
