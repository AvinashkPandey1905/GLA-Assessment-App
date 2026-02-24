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
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("userData");
  };

  const Layout = ({ children }) => {
    const location = useLocation();
    const noChrome = location.pathname === "/login" || location.pathname === "/logout";

    // Close sidebar on route change (mobile)
    React.useEffect(() => {
      setSidebarOpen(false);
    }, [location.pathname]);

    return (
      <div className="App">
        {!noChrome && (
          <Navbar
            onLogout={handleLogout}
            onMenuToggle={() => setSidebarOpen(o => !o)}
            sidebarOpen={sidebarOpen}
          />
        )}

        <div className="main-shell">
          {!noChrome && isAuthenticated && (
            <>
              {/* Mobile overlay */}
              <div
                className={`sidebar-overlay ${sidebarOpen ? "open" : ""}`}
                onClick={() => setSidebarOpen(false)}
              />
              <Sidebar
                onLogout={handleLogout}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
              />
            </>
          )}

          <main
            className={`page-content ${(!noChrome && isAuthenticated) ? "with-sidebar" : ""}`}
          >
            {children}
          </main>
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
