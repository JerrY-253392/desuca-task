import React, { useEffect, useState } from "react";
import AdminUserTable from "../components/AdminUserTable";
import UserModal from "../components/UserModal";
import { getAllUsers } from "../api/auth";
import { deleteUser } from "../api/adminManage";
import { App } from "antd";
import { UpdateManager } from "../api/managerManage";

const ManageUsers = () => {
  const [tab, setTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [isAssignMode, setIsAssignMode] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [selectFields, setSelectFields] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { message } = App.useApp();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        console.log("Fetched users:", users);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const openModal = (user) => {
    console.log(user);
    setModalData(user);
    setSelectFields([""]);
    setIsModalOpen(true);
  };

  const handleAddField = () => {
    if (selectFields.length < 3) {
      setSelectFields([...selectFields, ""]);
    }
  };

  const toggleAssignMode = () => {
    if (isAssignMode) {
      handleupdate(modalData._id, selectFields);
    }
    setIsAssignMode(!isAssignMode);
  };

  const handleUserAssignChange = (index, value) => {
    const updatedFields = [...selectFields];
    updatedFields[index] = value;
    console.log("UpdatedFields", updatedFields);
    setSelectFields(updatedFields);
    setIsModalOpen(false);
    setIsAssignMode(false);
  };

  const handleupdate = async (id, data) => {
    try {
      const response = await UpdateManager({ id, data });
      console.log("User updated:", response);
      message.success(response.message || "User updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
      message.error(error.response.message || "Failed to update user");
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const response = await deleteUser(id);
      console.log("User deleted:", response);
      setUsers(users.filter((u) => u._id !== id));
      message.success(response.message || "User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      message.error(error.response.message || "Failed to delete user");
    }
  };

  const filteredUsers = {
    users: users.filter((u) => u.role === "user"),
    managers: users.filter((u) => u.role === "manager"),
  };

  return (
    <div className="p-4">
      {/* Tabs */}
      <div className="flex gap-4 mb-4">
        {["users", "managers"].map((t) => (
          <button
            key={t}
            className={`px-4 py-2 rounded ${
              tab === t ? "bg-blue-500 text-white" : "bg-gray-100"
            }`}
            onClick={() => setTab(t)}
          >
            {t === "users"
              ? "All Users"
              : t === "managers"
              ? "Manage Managers"
              : " "}
          </button>
        ))}
      </div>

      {/* Tables */}
      {tab === "users" && (
        <AdminUserTable
          title="All Users"
          users={filteredUsers.users}
          onDeleteUser={handleDeleteUser}
          onViewUser={(id) => openModal(users.find((u) => u._id === id))}
        />
      )}
      {tab === "managers" && (
        <AdminUserTable
          title="Manage Managers"
          users={filteredUsers.managers}
          onDeleteUser={handleDeleteUser}
          onViewUser={(id) => openModal(users.find((u) => u._id === id))}
        />
      )}

      <UserModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setIsAssignMode(false);
        }}
        user={modalData}
        isManager={modalData?.role === "manager"}
        selectFields={selectFields}
        handleAddField={handleAddField}
        handleUserAssignChange={handleUserAssignChange}
        allUsers={users}
        isAssignMode={isAssignMode}
        toggleAssignMode={toggleAssignMode}
      />
    </div>
  );
};

export default ManageUsers;
