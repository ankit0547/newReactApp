import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='text-center'>
        <h1 className='text-6xl font-bold text-indigo-600'>404</h1>
        <p className='mt-4 text-xl font-semibold text-gray-700'>
          Oops! Page not found.
        </p>
        <p className='mt-2 text-gray-500'>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to='/'
          className='inline-block px-6 py-2 mt-6 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-500'
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
