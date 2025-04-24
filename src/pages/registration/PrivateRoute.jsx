import { useContext } from "react";
import { Navigate } from "react-router-dom";

export function PrivateRoute({ children, allowedRoles }) {
  const { user } = useContext(AuthContext);

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" />;
  }
  return children;
}
