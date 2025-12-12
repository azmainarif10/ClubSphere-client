import React, { use } from 'react';
import useAxios from '../../Utils/axios';
import { AuthContext } from '../../context/AuthContext';
import { useQuery } from '@tanstack/react-query';

const EventRegistrations = () => {
   const instance = useAxios()
   const {user} = use(AuthContext)
       const { data: myEvents = [] } = useQuery({
    queryKey: ["myEvents", user?.email],
    queryFn: async () => {
      const res = await instance.get(`/manager/event-registration?email=${user.email}`);
      return res.data;
    },
  });

    return (
       <div className="p-6">
  <h2 className="text-2xl font-bold mb-4">Event Registrations</h2>

  {/* Desktop Table */}
  <div className="overflow-x-auto hidden md:block">
    <table className="table table-zebra w-full">
      <thead>
        <tr>
          <th>#</th>
          <th>User Email</th>
          <th>Status</th>
          <th>Registered At</th>
        </tr>
      </thead>

      <tbody>
        {myEvents.length === 0 && (
          <tr>
            <td colSpan="4" className="text-center">
              No registrations yet.
            </td>
          </tr>
        )}

        {myEvents.map((reg, index) => (
          <tr key={reg._id}>
            <td>{index + 1}</td>
            <td>{reg.memberEmail}</td>
            <td>
              <span
                className={`badge capitalize ${
                  reg.status === "registered"
                    ? "badge-success"
                    : "badge-error"
                }`}
              >
                {reg.status}
              </span>
            </td>
            <td>{new Date(reg.joinedAt).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  <div className="md:hidden space-y-4">
    {myEvents.length === 0 && (
      <p className="text-center text-gray-600">No registrations yet.</p>
    )}

    {myEvents.map((reg, index) => (
      <div
        key={reg._id}
        className="border rounded-xl p-4 shadow-sm bg-white space-y-2"
      >
        <h3 className="text-lg font-semibold">
          Registration #{index + 1}
        </h3>

        <div className="text-sm">
          <span className="font-medium">Email: </span>
          {reg.userEmail}
        </div>

        <div className="text-sm">
          <span className="font-medium">Status: </span>
          <span
            className={`badge capitalize ${
              reg.status === "registered"
                ? "badge-success"
                : "badge-error"
            }`}
          >
            {reg.status}
          </span>
        </div>

        <div className="text-sm">
          <span className="font-medium">Registered At: </span>
          {new Date(reg.registeredAt).toLocaleString()}
        </div>
      </div>
    ))}
  </div>
</div>
         
    );
};

export default EventRegistrations;