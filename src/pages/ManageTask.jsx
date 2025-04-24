import React, { useEffect, useState } from "react";
import AssignTask from "../components/AssignTask";
import { deleteTaskById, getAllTask, updateTask } from "../api/task";
import TaskTable from "../components/TaskTable";
import { App } from "antd";
import { CookingPot } from "lucide-react";
import { getManager } from "../api/managerManage";
import secureLocalStorage from "react-secure-storage";

const ManageTask = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedAssignee, setSelectedAssignee] = useState("");
  const { message } = App.useApp();

  useEffect(() => {
    const id = secureLocalStorage.getItem("id");
    fetchTasks();
    fetchUsers(id);
  }, []);

  const fetchUsers = async (id) => {
    try {
      const response = await getManager(id);
      console.log("Fetched users:", response);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await getAllTask();
      console.log("Fetched tasks:", response);
      setTasks(response.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleViewTask = (task) => {
    setSelectedTask(task);
    setSelectedAssignee(task.assignedTo || "");
    setIsModalOpen(true);
  };

  const handleDeleteTask = async (id) => {
    try {
      const response = await deleteTaskById(id);
      console.log("Task Deleted:", response);
      message.success(response.message || "Task Deleted Successfully");
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
      message.error(error.message || "error Deleting Task");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
    setSelectedAssignee("");
  };

  const handleReassign = async () => {
    console.log("heheheh", selectedAssignee._id, selectedAssignee.userName);
    try {
      const response = await updateTask({
        id: selectedTask._id,
        assignedTo: selectedAssignee._id,
      });
      console.log("Task Reassigned:", response);
      message.success(response.message || "Task Reassigned Successfully");
      fetchTasks();
      handleCloseModal();
    } catch (error) {
      console.error.error("Error reassigning task:", error);
      message.error(error.message || "Error reassigning task");
    }
  };

  return (
    <div className="p-6">
      <TaskTable
        onViewUser={handleViewTask}
        onDeleteUser={handleDeleteTask}
        title="Manage Tasks"
        users={tasks}
      />
      <AssignTask
        isOpen={isModalOpen}
        task={selectedTask}
        onClose={handleCloseModal}
        assignedUsers={users?.managedUsers?.filter(
          (user) => user._id !== selectedTask?.assignedTo?._id
        )}
        onReassign={handleReassign}
        selectedAssignee={selectedAssignee}
        onSelectChange={setSelectedAssignee}
      />
    </div>
  );
};

export default ManageTask;
