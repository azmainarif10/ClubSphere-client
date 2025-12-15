import React, { use } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Utils/axios";
import { Link } from "react-router";
import { FaCheckCircle, FaTimesCircle, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import Load from "../Load/Load";

const MyMemberships = () => {
  const instance = useAxios();

  const {user} = use(AuthContext)
  const { data: memberships = [] ,isLoading} = useQuery({
    queryKey: ["MyMemberships"],
    queryFn: async () => {
      const res = await instance.get(`/memberships?email=${user.email}`);
      return res.data;
    },
  });
  if(isLoading){
    return Load
  }
  return (
    <div className="p-2 sm:p-4">
      <div className="hidden sm:block overflow-x-auto rounded-xl shadow">
        <table className="table table-zebra">
          <thead className="bg-base-200">
            <tr>
              <th>No</th>
              <th>Club Name</th>
              <th>Location</th>
              <th>Status</th>
              <th>Expiry Date</th>
              <th>Details</th>
            </tr>
          </thead>

          <tbody>
            {memberships.map((m, index) => (
              <tr key={m._id}>
                <th>{index + 1}</th>

                <td className="font-bold">{m.clubName}</td>

                <td className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-red-500" />
                  {m.location}
                </td>

                <td>
                  <span
                    className={`badge badge-md ${
                      m.status === "active"
                        ? "bg-green-600 text-white"
                        : "badge-warning"
                    }`}
                  >
                    {m.status}
                  </span>
                </td>

                <td className="flex items-center gap-2">
                  <FaCalendarAlt />
                  {new Date(m.expiryDate).toLocaleDateString()}
                </td>

                <td>
                  <Link to={`/clubs/${m.clubId}`}>
                    <button className="btn btn-sm btn-info">View</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="sm:hidden space-y-4 mt-4">
        {memberships.map((m) => (
          <div
            key={m._id}
            className="rounded-xl p-4 shadow bg-base-100"
          >
            <h3 className="font-bold text-lg">{m.clubName}</h3>
            <p className="text-sm opacity-70 flex items-center gap-2 mt-1">
              <FaMapMarkerAlt /> {m.location}
            </p>

            <div className="mt-3 text-sm space-y-2">
              <p className="flex items-center gap-2">
                <strong>Status:</strong>
                <span
                  className={`badge ${
                    m.status === "active"
                      ? "badge-success"
                      : "badge-warning"
                  }`}
                >
                  {m.status}
                </span>
              </p>

              <p className="flex items-center gap-2">
                <strong>Expires:</strong>
                <FaCalendarAlt />
                {new Date(m.expiryDate).toLocaleDateString()}
              </p>
            </div>

            <Link to={`/clubs/${m.clubId}`}>
              <button className="btn btn-primary btn-sm mt-3 w-full">
                View Club
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyMemberships;
