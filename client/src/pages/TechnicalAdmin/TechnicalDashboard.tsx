import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import TechnicalSidebar from '../../components/TechnicalAdmin/TechnicalSidebar'
import Footer from '../../components/Footer/Footer'

function TechnicalDashboard() {
  return (
    <div className="flex flex-col min-h-screen">
    {/* Navbar */}
    <Navbar />

    {/* Main Content Area */}
    <div className="flex flex-1">
      {/* Sidebar - fixed width on larger screens */}
      <div className="w-64 bg-gray-800 p-4">
        <TechnicalSidebar />
      </div>

      {/* Technical Create Category Section - takes remaining space */}
      <div className="flex-1 p-6 overflow-auto bg-gray-900">
        {/* <TechnicalCreateCategory /> */}
      </div>
    </div>

    {/* Footer */}
    <Footer />
  </div>
  )
}

export default TechnicalDashboard