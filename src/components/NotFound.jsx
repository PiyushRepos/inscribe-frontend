import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-[#121212] text-gray-800">
      <h1 className="text-6xl font-bold mb-4 dark:text-gray-300">404</h1>
      <p className="text-lg mb-6 dark:text-gray-400">
        Oops! The page you're looking for doesn't exist.
      </p>
      <button className="btn-primary">
        <Link to="/">Go to Homepage</Link>
      </button>
    </div>
  );
};

export default NotFound;
