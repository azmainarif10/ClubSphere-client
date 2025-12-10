import { Link } from "react-router";
import { FaHome, FaLayerGroup, FaCalendarCheck, FaMoneyBillWave } from "react-icons/fa";

const MemberMenu = () => {
  return (
    <>
      <li>
        <Link to="/dashboard/member">
          <button
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2"
            data-tip="Member Home"
          >
            <FaHome />
            <span className="is-drawer-close:hidden">Member Home</span>
          </button>
        </Link>
      </li>

      <li>
        <Link to="/dashboard/my-memberships">
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
        <Link to="/dashboard/my-events">
          <button
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2"
            data-tip="My Events"
          >
            <FaCalendarCheck />
            <span className="is-drawer-close:hidden">My Events</span>
          </button>
        </Link>
      </li>

      <li>
        <Link to="/dashboard/payment-history">
          <button
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2"
            data-tip="Payment History"
          >
            <FaMoneyBillWave />
            <span className="is-drawer-close:hidden">Payment History</span>
          </button>
        </Link>
      </li>
    </>
  );
};

export default MemberMenu;
