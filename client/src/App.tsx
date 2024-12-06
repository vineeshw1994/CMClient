import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SuperAdminPage } from "./pages/SuperAdmin/SuperAdminPage";
import { CreateCategory } from "./components/SuperAdmin/CreateCategory";
import { CreateCategoryPage } from "./pages/SuperAdmin/CreateCategoryPage";

function App() {
 return(
  <div>
    <Router>
      <Routes>
        <Route path="/superAdminDashboard" element={<SuperAdminPage/>} ></Route>
        <Route path="/SpaCreateCategory" element={<CreateCategoryPage/>} ></Route>
        
      </Routes>
    </Router>
  </div>
 )
       
}

export default App
