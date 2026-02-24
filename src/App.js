import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/profile";
import Choice from "./pages/choice";
import Result from "./pages/result";
import Login from "./pages/login";
import Logout from "./pages/logout";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(
    () => !!localStorage.getItem("userData")
  );

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("userData");
  };

  const Layout = ({ children }) => {
    const location = useLocation();
    const noChrome = location.pathname === "/login" || location.pathname === "/logout";

    return (
      <div className="App">
        {!noChrome && <Navbar onLogout={handleLogout} />}
        <div style={{ display: "flex" }}>
          {!noChrome && isAuthenticated && <Sidebar onLogout={handleLogout} />}
          <div
            className="page-content"
            style={{
              marginLeft: (!noChrome && isAuthenticated) ? "220px" : 0,
              paddingTop: !noChrome ? "32px" : 0,
              marginTop: !noChrome ? "64px" : 0,
            }}
          >
            {children}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/logout" element={<Logout />} />
          {isAuthenticated ? (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/choice" element={<Choice />} />
              <Route path="/result" element={<Result />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
