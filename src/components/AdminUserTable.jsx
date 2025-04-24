import React from "react";
import { Eye, Edit, Trash2 } from "lucide-react";

const AdminUserTable = ({
  users,
  onDeleteUser,
  onViewUser,
  columns,
  title = "All Users",
}) => {
  const columnKeys = columns || ["userName", "email", "role"];

  const columnLabels = {
    userName: "User Name",
    email: "Email",
    role: "Role",
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-md text-center">
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
            <tr>
              {columnKeys.map((key) => (
                <th key={key} className="px-4 py-2 border">
                  {columnLabels[key] || key}
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
                <td
                  colSpan={columnKeys.length + 1}
                  className="py-4 text-gray-500"
                >
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  {columnKeys.map((key) => (
                    <td key={key} className="px-4 py-2 border">
                      {user[key]}
                    </td>
                  ))}
                  {(onViewUser || onDeleteUser) && (
                    <td className="px-4 py-2 border space-x-2">
                      {onViewUser && (
                        <button
                          onClick={() => onViewUser && onViewUser(user._id)}
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

export default AdminUserTable;
