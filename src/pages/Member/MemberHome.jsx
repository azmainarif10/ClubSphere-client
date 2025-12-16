import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../context/AuthContext";
import { FaCalendarAlt, FaUsers, FaRegCalendarCheck } from "react-icons/fa";
import useAxios from "../../Utils/axios";
import { Link } from "react-router";

const MemberHome = () => {
  const instance = useAxios();
  const { user } = useContext(AuthContext);

  const { data: clubs = [] } = useQuery({
    queryKey: ["MyClubs"],
    queryFn: async () => {
      const res = await instance.get(`/memberships?email=${user.email}`);
      return res.data;
    },
  });

  const { data: events = [] } = useQuery({
    queryKey: ["MyEvents"],
    queryFn: async () => {
      const res = await instance.get(`/member/my-events?email=${user.email}`);
      return res.data;
    },
  });

  const upcomingEvents = events.filter(
    (e) => new Date(e.eventDate) >= new Date()
  );

  return (
    <div className="p-4 space-y-8">
      <div className="bg-gradient-to-r from-blue-300 to-white rounded-xl p-6 shadow-lg text-center transition-transform transform hover:scale-105">
        <h2 className="text-3xl font-bold">Welcome, {user.displayName}!</h2>
        <p className="text-sm opacity-90 mt-2">
          Here’s a quick overview of your club and event activity.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center transition-transform transform hover:scale-105 hover:shadow-2xl">
          <FaUsers className="text-4xl text-blue-500 mb-3" />
          <h3 className="font-bold text-2xl">{clubs.length}</h3>
          <p className="text-sm text-gray-500 mt-1">Clubs Joined</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center transition-transform transform hover:scale-105 hover:shadow-2xl">
          <FaRegCalendarCheck className="text-4xl text-green-500 mb-3" />
          <h3 className="font-bold text-2xl">{events.length}</h3>
          <p className="text-sm text-gray-500 mt-1">Events Registered</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center transition-transform transform hover:scale-105 hover:shadow-2xl">
          <FaCalendarAlt className="text-4xl text-red-500 mb-3" />
          <h3 className="font-bold text-2xl">{upcomingEvents.length}</h3>
          <p className="text-sm text-gray-500 mt-1">Upcoming Events</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-gray-700">Upcoming Events</h3>
        {upcomingEvents.length === 0 ? (
          <p className="text-gray-500">No upcoming events.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((e) => (
              <div
                key={e._id}
                className="bg-white rounded-xl shadow-lg p-5 flex flex-col justify-between transition-transform transform hover:scale-105 hover:shadow-2xl"
              >
                <div>
                  <h4 className="font-bold text-lg mb-2">{e.eventTitle}</h4>
                  <p className="text-sm text-gray-500 flex items-center gap-2 mb-1">
                    <FaCalendarAlt className="text-red-500" />{" "}
                    {new Date(e.eventDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500 mb-2">{e.clubName}</p>
                  <span
                    className={`badge ${
                      e.status === "registered"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {e.status}
                  </span>
                </div>
                <Link to={`/events/${e.eventId}`}>
                  <button className="btn bg-blue-300 text-white btn-sm mt-4 w-full">
                    View Event
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberHome;
