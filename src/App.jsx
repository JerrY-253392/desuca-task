import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/registration/Login";
import DashboardLayout from "./layouts/Dashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import ManagerDashboard from "./pages/dashboard/ManagerDashboard";
import UserDashboard from "./pages/dashboard/UserDashboard";
import ManageUsers from "./pages/ManageUsers";
import ProfilePage from "./components/Profile";
import Task from "./pages/Task";
import ManageTask from "./pages/ManageTask"
import NotFound from "./pages/registration/NotFound"
import { setupAxios } from "./api/config";

function App() {
  setupAxios();
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="manager" element={<ManagerDashboard />} />
        <Route path="user" element={<UserDashboard />} />
        <Route path="manage" element={<ManageUsers />} />
        <Route path="settings" element={<ProfilePage />} />
        <Route path="my-task" element={<Task />} />
        <Route path="manage-task" element={<ManageTask />} />
      </Route>

      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
