import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
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
          <nav>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/edit">Edit</Link>
            <Link to="/dashboard">Dash</Link>
          </nav>
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
