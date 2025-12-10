import { Link } from "react-router";
import { FaHome, FaUserCog, FaLayerGroup, FaMoneyCheckAlt } from "react-icons/fa";

const AdminMenu = () => {
  return (
    <>
      <li>
        <Link to="/dashboard/admin">
          <button
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2"
            data-tip="Admin Home"
          >
            <FaHome />
            <span className="is-drawer-close:hidden">Admin Home</span>
          </button>
        </Link>
      </li>

      <li>
        <Link to="/dashboard/manage-users">
          <button
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2"
            data-tip="Manage Users"
          >
            <FaUserCog />
            <span className="is-drawer-close:hidden">Manage Users</span>
          </button>
        </Link>
      </li>

      <li>
        <Link to="/dashboard/manage-clubs">
          <button
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2"
            data-tip="Manage Clubs"
          >
            <FaLayerGroup />
            <span className="is-drawer-close:hidden">Manage Clubs</span>
          </button>
        </Link>
      </li>

      <li>
        <Link to="/dashboard/payments">
          <button
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2"
            data-tip="All Payments"
          >
            <FaMoneyCheckAlt />
            <span className="is-drawer-close:hidden">All Payments</span>
          </button>
        </Link>
      </li>
    </>
  );
};

export default AdminMenu;
