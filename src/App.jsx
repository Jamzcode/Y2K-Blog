import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute";
import NavigationBar from "./Components/NavigationBar";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Login from "./Pages/Login";
import Edit from "./Pages/Edit";
import Dashboard from "./Pages/Dashboard";
import Archive from "./Pages/Archive";
import Footer from "./Components/Footer";
import "./index.css";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <div>
            <NavigationBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About/>}/>
              <Route path="/login" element={<Login />} />
              <Route
                path="/edit"
                element={
                  <ProtectedRoute>
                    <Edit />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="/archive" element={<Archive />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
