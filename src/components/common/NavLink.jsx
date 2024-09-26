/* eslint-disable react/prop-types */
const NavLink = ({ children, to }) => {
  return (
    <a href={to} className='text-sm text-indigo-600 hover:underline'>
      {children}
    </a>
  );
};

export default NavLink;
