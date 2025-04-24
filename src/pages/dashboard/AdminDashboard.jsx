import React, { useEffect, useState } from "react";
import CreateTaskModal from "../../components/TaskModal";
import AddUserModal from "../../components/AddUserModal";
import { App, message } from "antd";
import { createUser } from "../../api/auth";
import { getAllTask } from "../../api/task";

const AdminDashboard = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [tasks, setTasks] = useState([]);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const { message } = App.useApp();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getAllTask();
        console.log("Fetched tasks:", response);
        setTasks(response.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  const filteredTasks =
    selectedFilter === "all"
      ? tasks
      : tasks.filter((task) => task.status === selectedFilter);

  const handleCreateUser = async (data) => {
    try {
      console.log("User Data:", data);
      await createUser(data);
      message.success("User Created Successfully");
    } catch (e) {
      message.error(e.message ? e.message : "User is not Created");
    }
  };

  return (
    <div className="p-6 flex flex-col space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
        <button
          onClick={() => setIsAddUserOpen(true)}
          className="bg-purple-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          + Add User
        </button>
      </div>

      <div className="flex gap-6">
        {/* Filters */}
        <div className="w-1/4 space-y-4">
          <h3 className="text-lg font-medium mb-2">Filter by Status</h3>
          {["all", "in-progress", "pending", "completed"].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedFilter(status)}
              className={`block w-full text-left px-4 py-2 rounded-lg ${
                selectedFilter === status
                  ? "bg-purple-500 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Task Table */}
        <div className="w-3/4">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-4 py-2">#</th>
                <th className="text-left px-4 py-2">Title</th>
                <th className="text-left px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task, index) => (
                <tr
                  key={task.id}
                  className="border-t hover:bg-gray-50 transition duration-200"
                >
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{task.title}</td>
                  <td className="px-4 py-2 capitalize">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        task.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : task.status === "in-progress"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {task.status}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredTasks.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="px-4 py-4 text-center text-gray-500"
                  >
                    No tasks found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <AddUserModal
        isOpen={isAddUserOpen}
        onClose={() => setIsAddUserOpen(false)}
        onSubmit={handleCreateUser}
      />
    </div>
  );
};

export default AdminDashboard;
