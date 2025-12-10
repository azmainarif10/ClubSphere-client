import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaCheckCircle, FaTimesCircle, FaChartPie } from "react-icons/fa";
import useAxios from "../../Utils/axios";

const ManageClubs = () => {
  const instance = useAxios();

  const { data: clubs = [], refetch } = useQuery({
    queryKey: ["Club"],
    queryFn: async () => {
      const res = await instance.get("/admin/clubs");
      return res.data;
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await instance.patch(`/club/update-status/${id}`, { status });
      return { data: res.data, status };
    },
    onSuccess: ({ status }) => {
      Swal.fire(
        "Updated!",
        status === "approved"
          ? "Club Approved Successfully!"
          : "Club Rejected!",
        "success"
      );
      refetch();
    },
  });

  return (
    <div className="p-2 sm:p-4">

      <div className="hidden sm:block overflow-x-auto rounded-xl shadow">
        <table className="table table-zebra">
          <thead className="bg-base-200">
            <tr>
              <th>No</th>
              <th>Club Name</th>
              <th>Manager Email</th>
              <th>Status</th>
              <th>Membership Fee</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {clubs.map((club, index) => (
              <tr key={club._id}>
                <th>{index + 1}</th>
                <td className="font-bold">{club.clubName}</td>
                <td>{club.managerEmail}</td>

                <td>
                  <span
                    className={`badge badge-md ${
                      club.status === "approved"
                        ? "bg-green-600 text-white"
                        : club.status === "rejected"
                        ? "badge-error"
                        : "bg-yellow-200 text-yellow-800"
                    }`}
                  >
                    {club.status}
                  </span>
                </td>

                <td>${club.membershipFee}</td>

                <td>
                  <div className="flex flex-wrap gap-2">
                    <button
                      className="btn btn-sm text-green-600"
                      onClick={() =>
                        updateStatus.mutate({ id: club._id, status: "approved" })
                      }
                    >
                    Approve  <FaCheckCircle />
                    </button>

                    <button
                      className="btn btn-sm text-red-500"
                      onClick={() =>
                        updateStatus.mutate({ id: club._id, status: "rejected" })
                      }
                    >
                    Reject  <FaTimesCircle />
                    </button>

                    <button
                      className="btn btn-sm text-blue-600"
                      onClick={() => Swal.fire("Stats", "Coming soon!", "info")}
                    >
                     View <FaChartPie />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="sm:hidden space-y-4 mt-4">
        {clubs.map((club) => (
          <div
            key={club._id}
            className=" rounded-xl p-4 shadow bg-base-100"
          >
            <div>
              <h3 className="font-bold text-lg">{club.clubName}</h3>
              <p className="text-sm opacity-70">{club.managerEmail}</p>
            </div>

            <div className="mt-3 text-sm space-y-1">
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`badge ${
                    club.status === "approved"
                      ? "badge-success"
                      : club.status === "rejected"
                      ? "badge-error"
                      : "badge-warning"
                  }`}
                >
                  {club.status}
                </span>
              </p>

              <p>
                <strong>Membership Fee:</strong> ${club.membershipFee}
              </p>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <button
                className="btn btn-sm text-green-600"
                onClick={() =>
                  updateStatus.mutate({ id: club._id, status: "approved" })
                }
              >
                <FaCheckCircle /> Approve
              </button>

              <button
                className="btn btn-sm text-red-500"
                onClick={() =>
                  updateStatus.mutate({ id: club._id, status: "rejected" })
                }
              >
                <FaTimesCircle /> Reject
              </button>

              <button
                className="btn btn-sm text-blue-600"
                onClick={() => Swal.fire("Stats", "Coming soon!", "info")}
              >
                <FaChartPie /> Stats
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageClubs;
