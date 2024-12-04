import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SuperAdminPage } from "./pages/SuperAdmin/SuperAdminPage";

function App() {
 return(
  <div>
    <Router>
      <Routes>
        <Route path="/superAdminDashboard" element={<SuperAdminPage/>} ></Route>
        {/* <Route path="/superadminDashboard" element={} ></Route> */}

      </Routes>
    </Router>
  </div>
 )
       
}

export default App
