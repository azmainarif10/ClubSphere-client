import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import useAxios from "../../Utils/axios";
import Swal from "sweetalert2";
import { FaCheckCircle } from "react-icons/fa";

const EventPaymentSuccess = () => {
  const instance = useAxios();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (!sessionId) return;

    instance
      .get(`/event/payment-success?session_id=${sessionId}`)
      .then(() => {
        setVerified(true);

        Swal.fire({
          icon: "success",
          title: "Payment Successful 🎉",
          text: "You are successfully registered for the event.",
          timer: 2000,
          showConfirmButton: false,
        });

        setTimeout(() => {
          navigate("/dashboard/payment-history");
        }, 5000);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Payment Verification Failed",
          text: "Please contact support.",
        });
      });
  }, [instance, sessionId, navigate]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center space-y-4">
        <FaCheckCircle className="text-green-500 text-6xl mx-auto" />

        <h2 className="text-2xl font-bold text-gray-800">
          Payment Confirmed
        </h2>

        <p className="text-gray-600">
          Thank you for your payment. Your event registration is complete.
        </p>

        <p className="text-sm text-gray-400">
          You will be redirected to your payment history shortly.
        </p>

        <button
          onClick={() => navigate("/dashboard/payment-history")}
          className="btn btn-primary w-full mt-4"
        >
          Go to Payment History
        </button>
      </div>
    </div>
  );
};

export default EventPaymentSuccess;
