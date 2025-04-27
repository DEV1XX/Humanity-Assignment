import React, { useState } from "react";
import { Home, BarChart, Users, Send, DollarSign, Settings, HelpCircle, Layout, Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  
  // Custom AI Agent SVG icon component
  const AIAgentIcon = () => (
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2_36685)">
<path d="M16.2383 7.7625C18.582 10.1063 18.582 13.9031 16.2383 16.2469C15.0664 17.4188 15.0664 19.3219 16.2383 20.4844C17.4102 21.6562 19.3133 21.6562 20.4852 20.4844C25.1727 15.7969 25.1727 8.20312 20.4852 3.51562L16.2383 7.7625Z" fill="#7CA5E4"/>
<path d="M20.475 3.51562C15.7875 -1.17188 8.20312 -1.17188 3.51562 3.51562C-1.17188 8.20312 -1.17188 15.7969 3.51562 20.4844L7.7625 16.2469C5.41875 13.9031 5.41875 10.1063 7.7625 7.7625C10.1063 5.41875 13.9031 5.41875 16.2469 7.7625C17.4188 8.93438 19.3219 8.93438 20.4938 7.7625C21.6469 6.59063 21.6469 4.6875 20.475 3.51562Z" fill="#305AFF"/>
<path d="M20.4742 20.4846L16.2273 16.2471C13.8836 18.5908 10.0867 18.5908 7.74297 16.2471L3.49609 20.4846C8.20234 25.1721 15.7867 25.1721 20.4742 20.4846Z" fill="#B5D2FF"/>
<path d="M16.2383 16.2471C17.4102 15.0752 19.3039 15.0752 20.4758 16.2471C21.6477 17.4189 21.6477 19.3221 20.4758 20.4939C19.3039 21.6658 17.4102 21.6658 16.2383 20.4939C15.0664 19.3221 15.0664 17.4189 16.2383 16.2471Z" fill="#7CA5E4"/>
<path d="M3.51562 16.2468C4.6875 15.075 6.58125 15.075 7.75312 16.2468C8.925 17.4187 8.925 19.3218 7.75312 20.4937C6.58125 21.6656 4.6875 21.6656 3.51562 20.4937C2.34375 19.3218 2.34375 17.4187 3.51562 16.2468Z" fill="#B5D2FF"/>
</g>
<defs>
<clipPath id="clip0_2_36685">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>
  );

  const mainLinks = [
    { label: "Platform Setup", icon: <Layout size={20} />, path: "/platform-setup" },
    { label: "AI Agent", icon: <AIAgentIcon />, path: "/ai-agent" },
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