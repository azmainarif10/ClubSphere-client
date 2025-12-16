import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import useAxios from "../../Utils/axios";
import Swal from "sweetalert2";
import { FaCheckCircle } from "react-icons/fa";

const PaymentSuccess = () => {
  const instance = useAxios();
  const [searchParam] = useSearchParams();
  const navigate = useNavigate();

  const sessionId = searchParam.get("session_id");

  useEffect(() => {
    if (!sessionId) return;

    instance
      .get(`/payment-success?session_id=${sessionId}`)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Membership Activated 🎉",
          text: "You are now a verified club member.",
          showConfirmButton: false,
          timer: 1800,
        });

        setTimeout(() => {
          navigate("/dashboard/my-memberships");
        }, 5000);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Payment Verification Failed",
          text: "Please contact support if money was deducted.",
        });
      });
  }, [instance, sessionId, navigate]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="bg-base-100 shadow-xl rounded-2xl p-8 max-w-md text-center space-y-4">
        <FaCheckCircle className="text-green-500 text-6xl mx-auto" />

        <h2 className="text-2xl font-bold">
          Payment Successful
        </h2>

        <p className="text-gray-600">
          Your payment was processed successfully and your club membership has
          been activated.
        </p>

        <div className="bg-base-200 rounded-lg p-4 text-sm text-left">
          <p>✅ Membership added</p>
        </div>

        <div className="flex gap-3 justify-center pt-4">
          <button
            onClick={() => navigate("/dashboard/my-memberships")}
            className="btn btn-primary"
          >
            Go to My Clubs
          </button>

        
        </div>

        <p className="text-xs text-gray-400 pt-2">
          Redirecting you automatically...
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
