import { useDispatch } from "react-redux";
import { getAction } from "../../redux/util/util";
import { Link } from "react-router-dom";

const sideMenuItems = [
  {
    to: "/home",
    icon: "🏠",
    label: "Home",
  },
  {
    to: "/profile",
    icon: "📊",
    label: "Profile",
  },
  {
    to: "/settings",
    icon: "⚙️",
    label: "Settings",
  },
];

const Sidebar = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(getAction("USER_LOGOUT"));
  };

  return (
    <>
      <aside className='w-64 bg-gray-800 text-white flex flex-col'>
        <div className='flex items-center justify-center h-16'>
          <h1 className='text-xl font-bold'>Admin</h1>
        </div>
        <nav className='flex-grow'>
          <ul className='space-y-2 px-4'>
            {sideMenuItems.map((sm, i) => (
              <li key={`sidemenu-list-item-${i}`}>
                <Link
                  to={sm.to}
                  className='flex items-center p-2 text-gray-300 hover:bg-gray-700 rounded-md'
                >
                  <span>{sm.icon}</span>
                  <span className='ml-2'>{sm.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className='p-4'>
          <button
            className='w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md'
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
