import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SuperAdminPage } from "./pages/SuperAdmin/SuperAdminPage";

import { CreateCategoryPage } from "./pages/SuperAdmin/CreateCategoryPage";
import TechnicalAdmin from "./pages/TechnicalAdmin/TechnicalAdmin";

import TechnicalDashboard from "./pages/TechnicalAdmin/TechnicalDashboard";
import TechnicalCategoryList from "./pages/TechnicalAdmin/TechnicalCategoryList";
import CategoryForm from "./components/TechnicalAdmin/TechnicalCategoryForm";
import BusinessAdmin from "./pages/BusinessAdmin/BusinessAdmin";
import BusinessCategoryForm from "./components/BusinessAdmin/BusinessAddValue";
import { ListMetaCategoryPage } from "./pages/SuperAdmin/ListMetaCategoryPage";

import { CategoryFormPage } from "./pages/SuperAdmin/CategoryFormPage";
import { AuthProvider } from "./providers/auth-provider";
import { ProtectedRoute } from "./providers/protected-route";
import Login from "./pages/Authentication/Login";
import Signup from "./pages/Authentication/Signup";
import OtpPage from "./components/OtpPage/OtpPage";

function App() {
 return(
  <div>
    <Router>
      <AuthProvider>
      <Routes>

        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp/:userId" element={<OtpPage />} />

        <Route element={<ProtectedRoute allowedRoles={['SuperAdmin']} />}>
        <Route path="/superAdminDashboard" element={<SuperAdminPage/>} />
        <Route path="/SpaCreateCategory" element={<CreateCategoryPage/>} />
        <Route path="/SpaListCategory" element={<ListMetaCategoryPage/>} />
         <Route path="/spaCategory/:id" element={<CategoryFormPage/>} />
         </Route>
        

        <Route element={<ProtectedRoute allowedRoles={['TechnicalAdmin']} />}>
        <Route path="/technicalAdmin" element={<TechnicalAdmin/>} />
        <Route path="/technicalAdminDashboard" element={<TechnicalDashboard/>} />
        <Route path="/technicalcategorylist" element={<TechnicalCategoryList/>} />
        <Route path="/category/:id" element={<CategoryForm />} />
        </Route>


        <Route element={<ProtectedRoute allowedRoles={['BusinessAdmin']} />}>

        <Route path="/businessAdmin" element={<BusinessAdmin />} />
        <Route path="/businessCategory/:id" element={<BusinessCategoryForm />} />
        </Route>



        

      </Routes>
      </AuthProvider>
    </Router>
  </div>
 )
       
}

export default App
