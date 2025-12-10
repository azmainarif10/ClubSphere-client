import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div className="text-center p-5">Loading...</div>;

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
