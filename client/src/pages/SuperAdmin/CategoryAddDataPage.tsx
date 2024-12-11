import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import SpaCategoryForm from '../../components/SuperAdmin/SpaCategoryForm';
import { ColumnAddData } from '../../components/SuperAdmin/ColumnAddData';
import { CategorySideList } from '../../components/SuperAdmin/CategorySideList';

export const CategoryAddDataPage = () => {
    return (
        <>
        <div className="flex flex-col h-screen">
          {/* Navbar */}
          <div>
          <Navbar />
          </div>
    
          <div className="flex flex-1">
            {/* Sidebar */}
            
    
            {/* Main Content */}
            <div className="flex-1 p-8 mt-4 lg:mt-0 bg-gray-900 text-white">
    
              <h1 className="text-3xl font-semibold underline mb-4">""</h1>
              <ColumnAddData/>
            </div>


            <div className="lg:w-48 w-full lg:block hidden">
              <CategorySideList/>
            </div>
          </div>
    
          {/* <Footer/> */}
        </div>
        </>
      )
}
