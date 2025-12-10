import { Link } from "react-router";

const ManagerMenu = () => {
  return (
    <>
      <li>
        <Link to="/dashboard/manager">Manager Home</Link>
      </li>

      <li>
        <Link to="/dashboard/my-clubs">My Clubs</Link>
      </li>

      <li>
        <Link to="/dashboard/club-members">Club Members</Link>
      </li>

      <li>
        <Link to="/dashboard/events">My Events</Link>
      </li>

      <li>
        <Link to="/dashboard/event-registrations">Event Registrations</Link>
      </li>
    </>
  );
};

export default ManagerMenu;
