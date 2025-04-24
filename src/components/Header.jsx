import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    console.log("Logged out");
    setOpen(false);
  };

  return (
    <div className="bg-blue-600 text-white p-4 flex justify-end items-center">
      <div className="relative" ref={menuRef}>
        <div
          onClick={() => setOpen(!open)}
          className="rounded-full bg-black w-12 h-12 flex items-center justify-center  cursor-pointer"
        ></div>
        {open && (
          <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md p-2 z-50">
            <button
              className="w-full text-left px-4 py-2 text-red-500 cursor-pointer hover:bg-gray-100 rounded"
              onClick={() => navigate("/dashboard/settings")}
            >
              Profile
            </button>
            <button
              className="w-full text-left px-4 py-2 text-red-500 cursor-pointer hover:bg-gray-100 rounded"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
