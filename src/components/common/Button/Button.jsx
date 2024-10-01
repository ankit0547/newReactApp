/* eslint-disable react/prop-types */
const Button = ({ type, children, handleClick }) => {
  return (
    <button
      type={type}
      onClick={handleClick}
      className='w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-500'
    >
      {children}
    </button>
  );
};

export default Button;
