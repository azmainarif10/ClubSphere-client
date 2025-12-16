import React from "react";
import { useNavigate } from "react-router";
import { FaHome } from "react-icons/fa";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-violet-100 px-4">
      <div className="max-w-2xl text-center bg-white shadow-xl rounded-2xl p-10">
        
        <div className="flex justify-center mb-6">
          <div className="w-40 h-40 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-6xl font-extrabold text-blue-400">404</span>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Page Not Found
        </h1>

        <p className="text-gray-600 mb-8">
          Oops! The page you’re looking for doesn’t exist or may have been moved.
          Let’s get you back to discovering amazing clubs and events.
        </p>

        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
        >
          <FaHome />
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Error;
