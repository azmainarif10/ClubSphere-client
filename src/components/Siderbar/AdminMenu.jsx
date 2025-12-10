import { Link } from "react-router";

const AdminMenu = () => {
  return (
    <>
      <li>
        <Link to="/dashboard/admin">Admin Home</Link>
      </li>

      <li>
        <Link to="/dashboard/manage-users">Manage Users</Link>
      </li>

      <li>
        <Link to="/dashboard/manage-clubs">Manage Clubs</Link>
      </li>

      <li>
        <Link to="/dashboard/payments">All Payments</Link>
      </li>
    </>
  );
};

export default AdminMenu;
