// components/UserModal.jsx
import React from "react";
import { X, Plus } from "lucide-react";

const UserModal = ({
  isOpen,
  onClose,
  user,
  isManager,
  selectFields,
  handleAddField,
  handleUserAssignChange,
  allUsers,
  isAssignMode,
  toggleAssignMode,
}) => {
  if (!isOpen || !user) return null;

  const assignedUsers = allUsers.filter((u) => u.managerId === user._id);

  return (
    <>
      <div className="fixed inset-0 backdrop-blur-xs z-50" />
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-black"
          >
            <X />
          </button>

          <h2 className="text-xl font-semibold mb-4">
            {isManager ? "Manager Info" : "User Info"}
          </h2>

          <p className="mb-2">
            <strong>Name:</strong> {user.userName}
          </p>
          <p className="mb-2">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="mb-4">
            <strong>Role:</strong> {user.role}
          </p>

          {isManager && (
            <div>
              <div className="mb-4">
                <strong>Assigned Users:</strong>
                {user.managedUsers.length > 0 ? (
                  <ul className="list-disc list-inside mt-1 text-sm text-gray-700">
                    {user.managedUsers.map((u) => {
                      console.log("first", u);
                      return(
                      <li key={u._id}>{u.userName}</li>
                    )})}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500 mt-1">
                    No users assigned yet.
                  </p>
                )}
              </div>

              {isAssignMode && (
                <>
                  {selectFields.map((val, index) => (
                    <select
                      key={index}
                      value={val}
                      onChange={(e) =>
                        handleUserAssignChange(index, e.target.value)
                      }
                      className="w-full p-2 mb-2 border rounded"
                    >
                      <option value="">Select a user</option>
                      {allUsers
                        .filter((u) => u.role === "user")
                        .map((u) => (
                          <option key={u._id} value={u._id}>
                            {u.userName}
                          </option>
                        ))}
                    </select>
                  ))}

                  {selectFields.length < 3 && (
                    <button
                      onClick={handleAddField}
                      className="flex items-center text-blue-500 hover:text-blue-700 mt-1"
                    >
                      <Plus size={18} className="mr-1" />
                      Add another user
                    </button>
                  )}
                </>
              )}

              <button
                onClick={toggleAssignMode}
                className={`mt-4 px-4 py-2 rounded ${
                  isAssignMode
                    ? "bg-green-500 text-white"
                    : "bg-blue-500 text-white"
                }`}
              >
                {isAssignMode ? "Save" : "Assign New Users"}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserModal;
