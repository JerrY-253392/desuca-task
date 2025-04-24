import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import secureLocalStorage from "react-secure-storage";
import { useEffect, useState } from "react";

const DashboardLayout = () => {

  const [role, setRole] = useState("")
  const navigate = useNavigate();
  useEffect(()=>{
    const roleFromStorage = secureLocalStorage.getItem("role")
if (!roleFromStorage){
  secureLocalStorage.setItem("token", "");
  secureLocalStorage.setItem("role", "");
  navigate("/login")
  return;
}

setRole(roleFromStorage);
if (roleFromStorage == "user") navigate("/dashboard/user")
if (roleFromStorage == "manager") navigate("/dashboard/manager")
if (roleFromStorage == "admin") navigate("/dashboard/admin")

  }, [])

  return (
    <div className="flex min-h-screen">
      <Sidebar role={role} />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
