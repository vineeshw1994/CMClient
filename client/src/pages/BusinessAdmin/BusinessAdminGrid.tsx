import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import BusinessCategoryForm from '../../components/BusinessAdmin/BusinessAddValue'
import Footer from '../../components/Footer/Footer'
import BusinessAdminSidebar from '../../components/BusinessAdmin/BusinessAdminSidebar'
import BusinessAdminSideList from '../../components/BusinessAdmin/BusinessAdminSideList'

function BusinessAdminGrid() {
  return (
    <div className="flex flex-col bg-gray-900 min-h-screen">
    {/* Navbar */}
    <Navbar />

    {/* Main Content Area */}
    <div className="flex flex-1">
      {/* Sidebar - fixed width on larger screens */}
      <div className="w-80  bg-gray-900 p-4">
        <BusinessAdminSideList />
      </div>

      {/* Technical Create Category Section - takes remaining space */}
      <div className="flex-1 p-6 overflow-auto bg-gray-900">
        <BusinessCategoryForm />
      </div>
    </div>

    {/* Footer */}
    <Footer />
  </div>
  )
}

export default BusinessAdminGrid