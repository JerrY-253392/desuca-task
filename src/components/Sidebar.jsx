import React from "react";
import { Link, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

const Sidebar = ({ role }) => {
  
  const navigate = useNavigate();

  const logout = () => {
    secureLocalStorage.setItem("token", "");
    secureLocalStorage.setItem("role", "");
    navigate("/login")
    return;
  }

  return (
    <div className="w-64 bg-white text-black border-r  h-screen">
      <h2 className="text-blue-500 text-4xl py-5 text-center font-bold ">
        Duseca Task
      </h2>
      <hr className="h-28 " />
      <ul className="space-y-2 p-4">
        {role === "admin" && (
          <>
            <li>
              <Link
                to="/dashboard/admin"
                className="block px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
              >
                Admin Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/manage"
                className="block px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
              >
                Manage
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/my-task"
                className="block px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
              >
                My Tasks
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/settings"
                className="block px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
              >
                Settings
              </Link>
            </li>
          </>
        )}
        {role === "manager" && (
          <>
            <li>
              <Link
                to="/dashboard/manager"
                className="block px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
              >
                Manager Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/manage-task"
                className="block px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
              >
                Manage Tasks
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/my-task"
                className="block px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
              >
                My Tasks
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/settings"
                className="block px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
              >
                Settings
              </Link>
            </li>
          </>
        )}
        {role === "user" && (
          <>
            <li>
              <Link
                to="/dashboard/user"
                className="block px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
              >
                User Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/my-task"
                className="block px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
              >
                My Tasks
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/settings"
                className="block px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
              >
                Settings
              </Link>
            </li>
          </>
        )}
      </ul>

      <div className="fixed bottom-0 left-0 w-64 p-4  border-r ">
        <button className="w-full bg-blue-600  hover:bg-blue-700 text-white px-4 py-2 rounded"
        onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
