import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SuperAdminPage } from "./pages/SuperAdmin/SuperAdminPage";
import { CreateCategory } from "./components/SuperAdmin/CreateCategory";
import { CreateCategoryPage } from "./pages/SuperAdmin/CreateCategoryPage";
import TechnicalAdmin from "./pages/TechnicalAdmin/TechnicalAdmin";
import TechnicalCreateCategory from "./pages/TechnicalAdmin/TechnicalCreateCategory";
import TechnicalDashboard from "./pages/TechnicalAdmin/TechnicalDashboard";
import TechnicalCategoryList from "./pages/TechnicalAdmin/TechnicalCategoryList";
import CategoryForm from "./components/TechnicalAdmin/TechnicalCategoryForm";
import BusinessAdmin from "./pages/BusinessAdmin/BusinessAdmin";
import BusinessCategoryForm from "./components/BusinessAdmin/BusinessAddValue";
import { ListMetaCategoryPage } from "./pages/SuperAdmin/ListMetaCategoryPage";
import SpaCategoryForm from "./components/SuperAdmin/SpaCategoryForm";
import { CategoryFormPage } from "./pages/SuperAdmin/CategoryFormPage";
import Signup from "./pages/Auth/Signup";

function App() {
 return(
  <div>
    <Router>
      <Routes>

        

        <Route path="/superAdminDashboard" element={<SuperAdminPage/>} ></Route>
        <Route path="/SpaCreateCategory" element={<CreateCategoryPage/>} ></Route>
        <Route path="/SpaListCategory" element={<ListMetaCategoryPage/>} ></Route>
         <Route path="/spaCategory/:id" element={<CategoryFormPage/>} ></Route>

        
        <Route path="/technicalAdmin" element={<TechnicalAdmin/>} ></Route>
        <Route path="/technicalAdminDashboard" element={<TechnicalDashboard/>} ></Route>
        <Route path="/technicalcategorylist" element={<TechnicalCategoryList/>} ></Route>
        <Route path="/category/:id" element={<CategoryForm />} />


        <Route path="/businessAdmin" element={<BusinessAdmin />} />
        <Route path="/businessCategory/:id" element={<BusinessCategoryForm />} />



        <Route path="/signup" element={<Signup />} />

      </Routes>
    </Router>
  </div>
 )
       
}

export default App
