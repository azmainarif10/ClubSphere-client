import React, { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import Load from "../Load/Load";
import useSecureAxios from "../../Utils/secureAxios";
import { AuthContext } from "../../context/AuthContext";

const AdminHome = () => {
  const {user} = use(AuthContext)
  const secureInstance = useSecureAxios()

  const { data, isLoading } = useQuery({
    queryKey: ["adminRaw"],
    queryFn: async () => {
      const res = await secureInstance.get("/admin/data");
      return res.data;
    },
  });

  if (isLoading) return <Load></Load>;

  const { users, clubs, memberships, events, payments } = data;

  const totalUsers = users.length;
  const totalMemberships = memberships.length;
  const totalEvents = events.length;

  const totalPaymentsAmount = payments.reduce((sum, p) => sum + p.amount, 0);

  const clubCounts = {
    approved: clubs.filter((c) => c.status === "approved").length,
    pending: clubs.filter((c) => c.status === "pending").length,
    rejected: clubs.filter((c) => c.status === "rejected").length,
  };

  const membershipData = clubs.map((club) => ({
    name: club.clubName,
    value: memberships.filter((m) => m.clubId === club._id.toString()).length,
  }));

  return (
    <div className="p-4 space-y-6 ">
            <div className=" bg-gradient-to-r from-blue-300 to-white rounded-xl p-6 shadow-lg text-center transition-transform transform hover:scale-105">
        <h2 className="text-3xl font-bold">Welcome Admin, {user.displayName}!</h2>
        <p className="text-sm opacity-90 mt-2">
          Here’s a quick overview of your club and event activity.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="stat bg-base-200 rounded-xl p-4">
          <h3 className="text-xl font-bold">Users</h3>
          <p className="text-2xl">{totalUsers}</p>
        </div>

        <div className="stat bg-base-200 rounded-xl p-4">
          <h3 className="text-xl font-bold">Clubs</h3>
          <p className="text-lg">
            Approved: {clubCounts.approved} <br />
            Pending: {clubCounts.pending} <br />
            Rejected: {clubCounts.rejected}
          </p>
        </div>

        <div className="stat bg-base-200 rounded-xl p-4">
          <h3 className="text-xl font-bold">Memberships</h3>
          <p className="text-2xl">{totalMemberships}</p>
        </div>

        <div className="stat bg-base-200 rounded-xl p-4">
          <h3 className="text-xl font-bold">Events</h3>
          <p className="text-2xl">{totalEvents}</p>
        </div>

        <div className="stat bg-base-200 rounded-xl p-4">
          <h3 className="text-xl font-bold">Payments</h3>
          <p className="text-2xl">${totalPaymentsAmount}</p>
        </div>
      </div>

      <div className="bg-base-100 rounded-xl shadow p-4">
        <h2 className="text-xl font-bold mb-4">Memberships Per Club</h2>

        <PieChart width={300} height={250}>
          <Pie
            data={membershipData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {membershipData.map((_, index) => (
              <Cell key={index} fill={`hsl(${index * 40},70%,60%)`} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
};

export default AdminHome;
