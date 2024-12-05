import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SuperAdminPage } from "./pages/SuperAdmin/SuperAdminPage";
import TechnicalAdmin from "./pages/TechnicalAdmin/TechnicalAdmin";
import TechnicalCreateCategory from "./pages/TechnicalAdmin/TechnicalCreateCategory";
import TechnicalDashboard from "./pages/TechnicalAdmin/TechnicalDashboard";
import TechnicalCategoryList from "./pages/TechnicalAdmin/TechnicalCategoryList";

function App() {
 return(
  <div>
    <Router>
      <Routes>
        <Route path="/superAdminDashboard" element={<SuperAdminPage/>} ></Route>
        <Route path="/technicalAdmin" element={<TechnicalAdmin/>} ></Route>
        <Route path="/technicalAdminDashboard" element={<TechnicalDashboard/>} ></Route>
        <Route path="/technicalcategorylist" element={<TechnicalCategoryList/>} ></Route>

      </Routes>
    </Router>
  </div>
 )
       
}

export default App
