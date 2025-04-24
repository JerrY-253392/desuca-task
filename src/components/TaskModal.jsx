import React, { useState } from "react";

const CreateTaskModal = ({ isOpen, onClose, onSubmit, myTask, users }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
    assignedTo: "",
    status: "pending",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("Form data:", name, value);

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("gegege" , users)
    const taskPayload = {
      ...formData,
      creatorId: users?  users._id : "",
      creatorModel: users? users.role : "",
      assignedModel: myTask ? users.role : "user",
      assignedTo: myTask ? users._id : formData.assignedTo,
    };

    console.log("data to submit:", taskPayload);

    onSubmit(taskPayload);
    onClose();
    setFormData({
      title: "",
      description: "",
      dueDate: "",
      priority: "medium",
      assignedTo: "",
      status: "pending",
    });
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 backdrop-blur-sm z-50" />
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-none">
        <div className="bg-white rounded-xl w-full max-w-lg p-6 shadow-lg animate-fadeIn">
          <h2 className="text-xl font-semibold mb-4">Create New Task</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg"
                required
              ></textarea>
            </div>

            <div>
              <label className="block mb-1 font-medium">Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg"
                required
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block mb-1 font-medium">Priority</label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="flex-1">
                <label className="block mb-1 font-medium">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
            {!myTask && (
              <div>
                <label className="block mb-1 font-medium">Assign To</label>
                {users.managedUsers && users.managedUsers.length > 0 ? (
                  <select
                    name="assignedTo"
                    value={formData.assignedTo}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded-lg"
                  >
                    <option value="">select a user</option>
                    {users.managedUsers.map((user) => (
                      <option key={user._id} value={user._id}>
                        {user.userName}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="text-gray-500">No users found</p>
                )}
              </div>
            )}

            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Create Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateTaskModal;
