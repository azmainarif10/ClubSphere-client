import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { FaShieldAlt, FaUserShield, FaUserTag } from "react-icons/fa";
import { FiUserX } from "react-icons/fi";
import Swal from "sweetalert2";
import useAxios from "../../Utils/axios";
import Load from "../Load/Load";

const ManageUsers = () => {
  const instance = useAxios();

  const { data: users = [], refetch,isLoading } = useQuery({
    queryKey: ["UserManagement"],
    queryFn: async () => {
      const res = await instance.get("/users");
      return res.data;
    },
  });

  const updateRole = useMutation({
    mutationFn: async ({ id, role }) => {
      const res = await instance.patch(`/user/update-role/${id}`, { role });
      return { data: res.data, role };
    },
    onSuccess: ({ role }) => {
      const messages = {
        admin: "User promoted to Admin",
        clubManager: "User promoted to Club Manager",
        member: "User set as Member",
      };

      Swal.fire("Success!", messages[role], "success");
      refetch();
    },
  });

  if(isLoading){
    return <Load></Load>
  }
  return (
    <div className="p-2 sm:p-4">
      <div className="hidden sm:block overflow-x-auto rounded-xl shadow">
        <table className="table table-zebra">
          <thead className="bg-base-200">
            <tr>
              <th>No</th>
              <th>User Info</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined</th>
              <th>Change Role</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>

                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={user.image} alt="User" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.name}</div>
                      <div className="text-sm opacity-60">{user.email}</div>
                    </div>
                  </div>
                </td>

                <td>{user.email}</td>

                <td className="capitalize font-semibold">{user.role}</td>

                <td>{new Date(user.createdAt).toLocaleDateString()}</td>

                <td>
                  <div className="flex flex-wrap gap-2">
                    <button
                      className="btn btn-sm text-blue-600"
                      onClick={() => updateRole.mutate({ id: user._id, role: "admin" })}
                    >
                     Admin  <FaShieldAlt />
                    </button>

                    <button
                      className="btn btn-sm text-green-600"
                      onClick={() => updateRole.mutate({ id: user._id, role: "clubManager" })}
                    >
                    Manager  <FaUserShield />
                    </button>

                    <button
                      className="btn btn-sm text-yellow-600"
                      onClick={() => updateRole.mutate({ id: user._id, role: "member" })}
                    >
                     Member <FaUserTag />
                    </button>

                    <button
                      className="btn btn-sm text-red-500"
                      onClick={() => updateRole.mutate({ id: user._id, role: "member" })}
                    >
                   Member   <FiUserX />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="sm:hidden space-y-4 mt-4">
        {users.map((user) => (
          <div
            key={user._id}
            className=" rounded-xl p-4 shadow bg-base-100"
          >
            <div className="flex items-center gap-3">
              <img
                src={user.image}
                className="w-14 h-14 rounded-xl object-cover"
                alt="User"
              />

              <div>
                <h3 className="font-bold text-lg leading-tight">{user.name}</h3>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>

            <div className="mt-3 text-sm">
              <p>
                <strong>Role:</strong> {user.role}
              </p>
              <p>
                <strong>Joined:</strong>{" "}
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <button
                className="btn btn-sm text-blue-600"
                onClick={() => updateRole.mutate({ id: user._id, role: "admin" })}
              >
                <FaShieldAlt />
                Admin
              </button>

              <button
                className="btn btn-sm text-green-600"
                onClick={() =>
                  updateRole.mutate({ id: user._id, role: "clubManager" })
                }
              >
                <FaUserShield />
                Manager
              </button>

              <button
                className="btn btn-sm text-yellow-600"
                onClick={() => updateRole.mutate({ id: user._id, role: "member" })}
              >
                <FaUserTag />
                Member
              </button>

              <button
                className="btn btn-sm text-red-500"
                onClick={() => updateRole.mutate({ id: user._id, role: "member" })}
              >
                <FiUserX />
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;
