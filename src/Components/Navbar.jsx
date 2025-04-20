import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow px-4 h-16 flex items-center justify-between sticky top-0 z-10">
      <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
      <div className="flex items-center space-x-4">
      <div className="m-3">
            <a href="/login" className="m-3 p-2 bg-blue-200 rounded-md h-[2vh] w-[4vw]">Login</a>
            <a href="/register" className="m-3 p-2 bg-blue-200 rounded-md h-[2vh] w-[4vw]" >Register</a>
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
