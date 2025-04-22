import React, { useState } from "react";
import { Home, BarChart, Users, Send, DollarSign, Settings, HelpCircle, Layout, Bot, Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const mainLinks = [
    { label: "Platform Setup", icon: <Layout size={20} />, path: "/platform-setup" },
    { label: "AI Agent", icon: <Bot size={20} />, path: "/ai-agent" },
    { label: "Dashboard", icon: <Home size={20} />, path: "/" },
    { label: "Campaign", icon: <BarChart size={20} />, path: "/campaign" },
    { label: "Promoters", icon: <Users size={20} />, path: "/promoters" },
    { label: "Leads", icon: <Send size={20} />, path: "/leads" },
    { label: "Payouts", icon: <DollarSign size={20} />, path: "/payouts" },
  ];

  const bottomLinks = [
    { label: "Settings", icon: <Settings size={20} />, path: "/settings" },
    { label: "Help", icon: <HelpCircle size={20} />, path: "/help" },
  ];

  const NavItem = ({ link, onClick }) => (
    <NavLink
      to={link.path}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 p-2 rounded-md text-sm font-medium ${
          isActive ? "bg-blue-100 text-blue-600" : "text-blue-600 hover:bg-gray-100"
        }`
      }
    >
      {link.icon}
      {link.label}
    </NavLink>
  );

  // Mobile sidebar toggle button
  const MobileToggle = () => (
    <button 
      className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-md shadow-md"
      onClick={toggleSidebar}
    >
      {isOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
  );

  return (
    <>
      <MobileToggle />
      
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar with white background */}
      <aside 
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:static md:z-0`}
      >
        
        
        {/* Main navigation links */}
        <nav className="p-4 space-y-2 flex-grow overflow-y-auto mt-12">
          {mainLinks.map((link, idx) => (
            <NavItem key={idx} link={link} onClick={() => setIsOpen(false)} />
          ))}
        </nav>
        
        {/* Thin gray separation line */}
        <div className="border-t border-gray-200 mx-4"></div>
        
        {/* Bottom navigation links */}
        <div className="p-4 space-y-2">
          {bottomLinks.map((link, idx) => (
            <NavItem key={idx} link={link} onClick={() => setIsOpen(false)} />
          ))}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;