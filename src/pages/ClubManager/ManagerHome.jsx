import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Utils/axios";
import { AuthContext } from "../../context/AuthContext";
import { FaBuilding, FaUsers, FaCalendarAlt, FaDollarSign } from "react-icons/fa";

const ManagerHome = () => {
  const { user } = useContext(AuthContext);
  const instance = useAxios();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["managerOverview", user?.email],
    queryFn: async () => {
      const res = await instance.get(`/manager/overview?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading)
    return (
      <p className="text-center mt-10 text-gray-400 font-semibold">Loading...</p>
    );

  const cards = [
    {
      title: "Total Clubs",
      value: stats.totalClubs,
      icon: <FaBuilding size={28} />,
      gradient: "bg-gradient-to-r from-blue-300 to-white",
    },
    {
      title: "Total Members",
      value: stats.totalMembers,
      icon: <FaUsers size={28} />,
      gradient: "bg-gradient-to-r from-blue-300 to-white",
    },
    {
      title: "Total Events",
      value: stats.totalEvents,
      icon: <FaCalendarAlt size={28} />,
      gradient: "bg-gradient-to-r from-blue-300 to-white",
    },
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue}`,
      icon: <FaDollarSign size={28} />,
      gradient: "bg-gradient-to-r from-blue-300 to-white",
    },
  ];

  return (
    <div className="p-4 md:p-8 min-h-screen text-gray-700">
      <h2 className="text-2xl  text-gray-700 md:text-3xl font-bold mb-6 ">
        Manager Dashboard Overview
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`flex items-center gap-4 p-5 rounded-xl shadow-lg transform hover:scale-105 transition-transform ${card.gradient}`}
          >
            <div className="text-gray-700">{card.icon}</div>
            <div>
              <div className="text-sm text-gray-700">{card.title}</div>
              <div className="text-2xl  text-gray-700 font-bold">{card.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagerHome;
