import { Link } from "react-router";
import { FaHome, FaLayerGroup, FaUsers, FaCalendarAlt, FaClipboardList } from "react-icons/fa";

const ManagerMenu = () => {
  return (
    <>
      <li>
        <Link to="/dashboard/manager">
          <button
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2"
            data-tip="Manager Home"
          >
            <FaHome />
            <span className="is-drawer-close:hidden">Manager Home</span>
          </button>
        </Link>
      </li>

      <li>
        <Link to="/dashboard/my-clubs">
          <button
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2"
            data-tip="My Clubs"
          >
            <FaLayerGroup />
            <span className="is-drawer-close:hidden">My Clubs</span>
          </button>
        </Link>
      </li>

      <li>
        <Link to="/dashboard/club-members">
          <button
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2"
            data-tip="Club Members"
          >
            <FaUsers />
            <span className="is-drawer-close:hidden">Club Members</span>
          </button>
        </Link>
      </li>

      <li>
        <Link to="/dashboard/events">
          <button
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2"
            data-tip="My Events"
          >
            <FaCalendarAlt />
            <span className="is-drawer-close:hidden">My Events</span>
          </button>
        </Link>
      </li>

      <li>
        <Link to="/dashboard/event-registrations">
          <button
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2"
            data-tip="Event Registrations"
          >
            <FaClipboardList />
            <span className="is-drawer-close:hidden">Event Registrations</span>
          </button>
        </Link>
      </li>
    </>
  );
};

export default ManagerMenu;
