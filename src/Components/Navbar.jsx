import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LogOut, Bell } from "lucide-react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: ""
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notificationCount, setNotificationCount] = useState(2); // Example notification count
  
  useEffect(() => {
    // Get user data from localStorage or sessionStorage
    const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || '{}');
    if (user && user.email) {
      setUserData({
        name: user.name || user.email.split('@')[0],
        email: user.email
      });
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [location.pathname]); // Re-check when route changes
  
  // Function to generate title based on current path
  const getHeaderTitle = () => {
    const path = location.pathname;
    
    // Remove leading slash and convert to title case
    if (path === "/") return "Dashboard";
    if(path === "/leads") return "Manage and monitor your leads";
    if(path === "/promoters") return "Manage and monitor your promoters";
    if(path === "/payouts") return "Manage and monitor your payouts";
    
    const routeName = path.substring(1); // Remove leading slash
    
    // Handle special cases like 'ai-agent' -> 'AI Agent'
    if (routeName.toLowerCase() === "ai-agent") return "AI Agent";
    
    // Convert kebab-case to Title Case (e.g., platform-setup -> Platform Setup)
    return routeName
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleLogout = () => {
    // Clear tokens from localStorage
    // localStorage.removeItem('accessToken');
    // localStorage.removeItem('access_token');
    // localStorage.removeItem('refreshToken');
    // localStorage.removeItem('token');
    // localStorage.removeItem('user');
    // sessionStorage.removeItem('accessToken');
    // sessionStorage.removeItem('refreshToken');
    // sessionStorage.removeItem('user');
    
    // // Update state
    // setIsLoggedIn(false);
    // setUserData({ name: "", email: "" });
    
    // // Navigate to login page
    // navigate('/login');
    dispatch(logoutUser());
  };

  return (
    <nav className="bg-white shadow px-4 h-16 flex items-center justify-between sticky top-0 z-10">
      <h1 className="text-xl font-semibold text-gray-800">{getHeaderTitle()}</h1>
      <div className="flex items-center space-x-4">
        {!isLoggedIn ? (
          <div className="m-3">
            <a href="/login" className="m-3 p-2 text-blue-500 font-semibold rounded-md">Login</a>
            <a href="/register" className="m-3 p-2 text-blue-500 font-semibold rounded-md">Register</a>
          </div>
        ) : (
          <>
            <div className="relative">
              <Bell size={20} className="text-gray-500 hover:text-blue-500 cursor-pointer" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">{userData.name}</p>
              <p className="text-xs text-gray-500">{userData.email}</p>
            </div>
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=random`}
              alt="avatar"
              className="w-10 h-10 rounded-full"
            />
            <button 
              onClick={handleLogout}
              className="text-gray-500 hover:text-red-500 transition-colors"
              aria-label="Logout"
            >
              <LogOut size={20} />
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;