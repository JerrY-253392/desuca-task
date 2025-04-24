import React from "react";
import { X } from "lucide-react";

const AssignTask = ({
  isOpen,
  task,
  onClose,
  assignedUsers,
  onReassign,
  selectedAssignee,
  onSelectChange,
}) => {
  if (!isOpen || !task) return null;
  console.log(task);
  return (
    <>
      <div className="fixed inset-0 backdrop-blur-sm z-40" />
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
          <button
            className="absolute top-3 right-3 text-gray-600 hover:text-black"
            onClick={onClose}
          >
            <X />
          </button>

          <h2 className="text-xl font-semibold mb-4">Task Details</h2>

          <p className="mb-2">
            <strong>Title:</strong> {task.title}
          </p>
          <p className="mb-2">
            <strong>Status:</strong> {task.status}
          </p>
          <p className="mb-2">
            <strong>Due Date:</strong> {task.dueDate.split("T")[0]}
          </p>
          <p className="mb-4">
            <strong>Current Assignee:</strong> {task.assignedTo.userName}
          </p>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reassign To:
            </label>
            <select
              value={selectedAssignee?._id || ""}
              onChange={(e) => {
                const selectedId = e.target.value;
                const user = assignedUsers.find((u) => u._id === selectedId);
                onSelectChange(user); 
              }}
              className="w-full border p-2 rounded"
            >
              <option value="">Select user</option>
              {assignedUsers.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.userName}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={onReassign}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Save Assignment
          </button>
        </div>
      </div>
    </>
  );
};

export default AssignTask;
