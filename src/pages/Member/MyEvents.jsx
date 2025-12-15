import React, { use } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Utils/axios";
import { Link } from "react-router";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import Load from "../Load/Load";

const MyEvents = () => {
  const instance = useAxios();
  const {user} = use(AuthContext)
  const { data: events = [], isLoading } = useQuery({
    queryKey: ["MyEvents"],
    queryFn: async () => {
      const res = await instance.get(`/member/my-events?email=${user.email}`); 
      return res.data;
    },
  });

  if (isLoading) {
    return <Load></Load>;
  }

  return (
    <div className="p-2 sm:p-4">
      <div className="hidden sm:block overflow-x-auto rounded-xl shadow">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200">
            <tr>
              <th>No</th>
              <th>Event Title</th>
              <th>Club</th>
              <th>Date</th>
              <th>Status</th>
            
            </tr>
          </thead>
          <tbody>
            {events.map((e, index) => (
              <tr key={e._id}>
                <td>{index + 1}</td>
                <td className="font-bold">{e.eventTitle}</td>
                <td className="flex items-center gap-2">
                
                  {e.clubName}
                </td>
               
                <td >
                  <FaCalendarAlt />   {new Date(e.eventDate).toLocaleDateString()}
                
                </td>
                <td>
                  <span
                    className={`badge ${
                      e.status === "registered"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {e.status}
                  </span>
                </td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="sm:hidden space-y-4 mt-4">
        {events.map((e) => (
          <div key={e._id} className="rounded-xl p-4 shadow bg-base-100">
            <h3 className="font-bold text-lg">{e.eventTitle}</h3>
            <p className="text-sm opacity-70 flex items-center gap-2 mt-1">
              <FaMapMarkerAlt /> {e.clubName}
            </p>
            <p className="text-sm flex items-center gap-2">
              <FaCalendarAlt /> {new Date(e.eventDate).toLocaleDateString()}
            </p>
            <p className="text-sm mt-2">
              Status:{" "}
              <span
                className={`badge ${
                  e.status === "registered" ? "badge-success" : "badge-warning"
                }`}
              >
                {e.status}
              </span>
            </p>
            <Link to={`/events/${e.eventId}`}>
              <button className="btn btn-primary btn-sm mt-3 w-full">
                View Event
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyEvents;
