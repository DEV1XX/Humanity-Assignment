import React from "react";
import { Home, BarChart, Users, Send, Layers, DollarSign, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const links = [
    { label: "Dashboard", icon: <Home size={20} />, path: "/" },
    { label: "Campaign", icon: <BarChart size={20} />, path: "/campaign" },
    { label: "Promoters", icon: <Users size={20} />, path: "/promoters" },
    { label: "Leads", icon: <Send size={20} />, path: "/leads" },
    { label: "Payouts", icon: <DollarSign size={20} />, path: "/payouts" },
    { label: "Settings", icon: <Settings size={20} />, path: "/settings" },
  ];

  return (
    <aside className="w-64 bg-white border-r hidden md:block">
      <div className="h-16 flex items-center justify-center border-b font-bold text-lg">
        Referral Hub
      </div>
      <nav className="p-4 space-y-2">
        {links.map((link, idx) => (
          <NavLink
            key={idx}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-md text-sm font-medium ${
                isActive ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            {link.icon}
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
