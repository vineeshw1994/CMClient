import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Samplepage } from "./pages/Samplepage";

function App() {
 return(
  <div>
    <Router>
      <Routes>
        <Route path="/" element={<Samplepage/>} ></Route>
        {/* <Route path="/superadminDashboard" element={} ></Route> */}

      </Routes>
    </Router>
  </div>
 )
       
}

export default App
