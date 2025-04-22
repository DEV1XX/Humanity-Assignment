import React from "react";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  
  // Function to generate title based on current path
  const getHeaderTitle = () => {
    const path = location.pathname;
    
    // Remove leading slash and convert to title case
    if (path === "/") return "Dashboard";
    
    const routeName = path.substring(1); // Remove leading slash
    
    // Handle special cases like 'ai-agent' -> 'AI Agent'
    if (routeName.toLowerCase() === "ai-agent") return "AI Agent";
    
    // Convert kebab-case to Title Case (e.g., platform-setup -> Platform Setup)
    return routeName
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <nav className="bg-white shadow px-4 h-16 flex items-center justify-between sticky top-0 z-10">
      <h1 className="text-xl font-semibold text-gray-800">{getHeaderTitle()}</h1>
      <div className="flex items-center space-x-4">
        <div className="m-3">
          <a href="/login" className="m-3 p-2 bg-blue-200 rounded-md h-[2vh] w-[4vw]">Login</a>
          <a href="/register" className="m-3 p-2 bg-blue-200 rounded-md h-[2vh] w-[4vw]">Register</a>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium">Kadin Stanton</p>
          <p className="text-xs text-gray-500">kadin@referemail.com</p>
        </div>
        <img
          src="https://i.pravatar.cc/40"
          alt="avatar"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </nav>
  );
};

export default Navbar;