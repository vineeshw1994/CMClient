import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import { CreateCategory } from '../../components/SuperAdmin/CreateCategory';
import Footer from '../../components/Footer/Footer';

export const CreateCategoryPage = () => {
  return (
    <>
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <div>
      <Navbar />
      </div>

      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="lg:w-64 w-full lg:block hidden">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 mt-4 lg:mt-0 bg-gray-900 text-white">

          <h1 className="text-3xl font-semibold underline mb-4">""</h1>
          <CreateCategory />
        </div>
      </div>

      {/* <Footer/> */}
    </div>
    </>
  );
};
