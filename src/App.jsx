import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavigationBar from "./Components/NavigationBar";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Edit from "./Pages/Edit";
import Dashboard from "./Pages/Dashboard";
import Archive from "./Pages/Archive";
import Footer from "./Components/Footer";
import "./index.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <div>
          <NavigationBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/edit" element={<Edit />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/archive" element={<Archive />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
