import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-[#121212] text-gray-800">
      <h1 className="text-6xl font-bold mb-4 dark:text-gray-300">404</h1>
      <p className="text-lg mb-6 dark:text-gray-400">
        Oops! The page you're looking for doesn't exist.
      </p>
      <button onClick={handleGoHome} className="btn-primary">
        Go to Homepage
      </button>
    </div>
  );
};

export default NotFound;
