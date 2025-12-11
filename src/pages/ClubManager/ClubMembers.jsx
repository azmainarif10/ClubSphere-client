import React, { useContext } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxios from "../../Utils/axios";
import { AuthContext } from "../../context/AuthContext";

const ClubMembers = () => {
  const { user } = useContext(AuthContext);
  const instance = useAxios();

  const { data: members = [], refetch } = useQuery({
    queryKey: ["clubMembers", user?.email],
    queryFn: async () => {
      const res = await instance.get(`/manager/club-members?email=${user.email}`);
      return res.data;
    },
  });

  const expireMembershipMutation = useMutation({
    mutationFn: async ({ id }) => {
      const res = await instance.patch(`/membership/${id}/status`, { status: "expired" });
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Updated!", "Membership status set to expired.", "success");
      refetch();
    },
  });

  const handleExpire = (id) => {
    Swal.fire({
      title: "Expire Membership?",
      text: "This will mark membership as expired.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, expire",
    }).then((result) => {
      if (result.isConfirmed) {
        expireMembershipMutation.mutate({ id });
      }
    });
  };

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold mb-4">Club Members</h2>

      <div className="hidden md:block overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Club</th>
              <th>Status</th>
              <th>Join Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m, index) => (
               
              <tr key={m._id}>
                <td>{index + 1}</td>
                <td>{m.memberEmail}</td>
                <td>{m.clubName}</td>
                <td className="capitalize">{m.status}</td>
                <td>{new Date(m.joinedAt).toLocaleDateString()}</td>
                <td>
                  {m.status !== "expired" && (
                    <button
                      className="btn btn-sm bg-red-600 text-white"
                      onClick={() => handleExpire(m._id)}
                    >
                      Expire
                    </button>
                  )}
                
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-4">
        {members.map((m, index) => (
          <div
            key={m._id}
            className="p-4 rounded-xl shadow bg-white border flex flex-col gap-2"
          >
            <div className="font-semibold text-lg">Member #{index + 1}</div>

            <div className="text-sm">
              <span className="font-semibold">Email:</span> {m.memberEmail}
            </div>

            <div className="text-sm">
              <span className="font-semibold">Club:</span> {m.clubName}
            </div>

            <div className="text-sm">
              <span className="font-semibold">Status:</span>{" "}
              <span className={`capitalize font-bold ${m.status === "expired" ? "text-red-600" : "text-green-600"}`}>
                {m.status}
              </span>
            </div>

            <div className="text-sm">
              <span className="font-semibold">Joined:</span>{" "}
              {new Date(m.joinedAt).toLocaleDateString()}
            </div>

            {m.status !== "expired" && (
              <button
                className="btn btn-sm bg-red-600 text-white mt-2"
                onClick={() => handleExpire(m._id)}
              >
                Expire Membership
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClubMembers;
