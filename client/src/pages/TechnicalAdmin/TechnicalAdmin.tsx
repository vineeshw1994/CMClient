import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import TechnicalCreateCategory from './TechnicalCreateCategory';
import TechnicalSidebar from '../../components/TechnicalAdmin/TechnicalSidebar';

function TechnicalAdmin() {
  return (
    <div className="flex flex-col bg-gray-900 min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <div className="flex flex-1">
        {/* Sidebar - fixed width on larger screens */}
        <div className="w-64 bg-gray-900 p-4">
          <TechnicalSidebar />
        </div>

        {/* Technical Create Category Section - takes remaining space */}
        <div className="flex-1 p-6 overflow-auto bg-gray-900">
          <TechnicalCreateCategory />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default TechnicalAdmin;