import { Link } from "react-router";

const MemberMenu = () => {
  return (
    <>
      <li>
        <Link to="/dashboard/member">Member Home</Link>
      </li>

      <li>
        <Link to="/dashboard/my-memberships">My Clubs</Link>
      </li>

      <li>
        <Link to="/dashboard/my-events">My Events</Link>
      </li>

      <li>
        <Link to="/dashboard/payment-history">Payment History</Link>
      </li>
    </>
  );
};

export default MemberMenu;
