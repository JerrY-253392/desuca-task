import React from "react";
import { Eye, Trash2 } from "lucide-react";

const getNestedValue = (obj, path) => {
  const value = path.split(".").reduce((acc, part) => acc?.[part], obj);

  if (path === "dueDate" && typeof value === "string") {
    return value.split("T")[0]; // returns just the date part like "2025-04-24"
  }

  return value || "";
};

const TaskTable = ({
  users,
  onDeleteUser,
  onViewUser,
  title = "Manage Tasks",
}) => {
  const columns = [
    { key: "title", label: "Title" },
    { key: "assignedTo.userName", label: "Assigned To" },
    { key: "status", label: "Status" },
    { key: "dueDate", label: "Due Date" },
  ];

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-md text-center">
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-2 border">
                  {col.label}
                </th>
              ))}
              {(onViewUser || onDeleteUser) && (
                <th className="px-4 py-2 border">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="py-4 text-gray-500">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-2 border">
                      {getNestedValue(user, col.key)}
                    </td>
                  ))}
                  {(onViewUser || onDeleteUser) && (
                    <td className="px-4 py-2 border space-x-2">
                      {onViewUser && (
                        <button
                          onClick={() => onViewUser(user)}
                          className="text-blue-500 hover:text-blue-700"
                          title="View"
                        >
                          <Eye size={18} />
                        </button>
                      )}
                      {onDeleteUser && (
                        <button
                          onClick={() => onDeleteUser(user._id)}
                          className="text-red-500 hover:text-red-600"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskTable;
