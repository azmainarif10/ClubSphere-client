import { Navigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import useRole from "../Utils/useRole";

const RoleRoute = ({ children, allowed }) => {
  const { loading } = useContext(AuthContext);
  const {role,isLoading} = useRole()

  if (loading || isLoading) return <div>Loading...</div>;

  return allowed.includes(role) ? children : <Navigate to="/" />;
};

export default RoleRoute;
