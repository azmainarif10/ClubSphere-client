import React, { use } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Utils/axios";
import { AuthContext } from "../../context/AuthContext";

const PaymentHistory = () => {
  const instance = useAxios();
  const {user} = use(AuthContext)
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await instance.get(`/my-payments?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <p>Loading payments...</p>;

  return (
    <div className="p-2 sm:p-4 space-y-4">

      <div className="hidden sm:block overflow-x-auto rounded-xl shadow">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200">
            <tr>
              <th>No</th>
              <th>User Email</th>
              <th>Amount</th>
                <th>Club</th>
              <th>Type</th>
              <th>Club ID/Event ID</th>
              <th>Date</th>
              <th>Transaction ID</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>{p.userEmail}</td>
                <td>${p.amount}</td>
                <td>{p.clubName}</td>
                
                <td>{p.type}</td>
                <td>{p.eventId || p.clubId}</td>
                <td>{p.createdAt}</td>
                <td>{p.transactionId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="sm:hidden space-y-4">
        {payments.map((p, i) => (
          <div
            key={i}
            className="bg-base-100 rounded-xl shadow p-4 space-y-2"
          >
            <p><strong>No:</strong> {i + 1}</p>
            <p><strong>User Email:</strong> {p.userEmail}</p>
            <p><strong>Amount:</strong> ${p.amount}</p>
            <p><strong>Type:</strong> {p.type}</p>
            <p><strong>Club ID/Event ID:</strong> {p.eventId || p.clubId}</p>
             <p>{p.createdAt}</p>
            <p><strong>Transaction ID:</strong> {p.transactionId}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentHistory;
