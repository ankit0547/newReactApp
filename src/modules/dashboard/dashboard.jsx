import { useDispatch, useSelector } from "react-redux";
import { getAction } from "../../redux/util/util";
import { useEffect } from "react";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { userDetails } = useSelector((state) => state.AuthState);

  const handleLogout = () => {
    dispatch(getAction("USER_LOGOUT"));
  };

  console.log("userDetails", userDetails);
  useEffect(() => {
    dispatch(getAction("GET_USER_DETAILS"));
  }, []);

  return (
    <div>
      {/* <!-- Sidebar --> */}
      <div className='flex h-screen'>
        <aside className='w-64 bg-gray-800 text-white flex flex-col'>
          <div className='flex items-center justify-center h-16'>
            <h1 className='text-xl font-bold'>Dashboard</h1>
          </div>
          <nav className='flex-grow'>
            <ul className='space-y-2 px-4'>
              <li>
                <a
                  href='#'
                  className='flex items-center p-2 text-gray-300 hover:bg-gray-700 rounded-md'
                >
                  <span>🏠</span>
                  <span className='ml-2'>Home</span>
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='flex items-center p-2 text-gray-300 hover:bg-gray-700 rounded-md'
                >
                  <span>📊</span>
                  <span className='ml-2'>Analytics</span>
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='flex items-center p-2 text-gray-300 hover:bg-gray-700 rounded-md'
                >
                  <span>⚙️</span>
                  <span className='ml-2'>Settings</span>
                </a>
              </li>
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
        {/* <!-- Main Content --> */}
        <div className='flex-grow'>
          {/* <!-- Top Bar --> */}
          <header className='bg-white shadow-md py-4 px-6'>
            <div className='flex justify-between items-center'>
              <h2 className='text-xl font-semibold text-gray-800'>
                {`Hi! ${userDetails.profile.username}`}
              </h2>

              <div className='flex space-x-4'>
                <input
                  type='text'
                  placeholder='Search'
                  className='border border-gray-300 px-4 py-2 rounded-md'
                />
                <button className='bg-blue-600 text-white px-4 py-2 rounded-md'>
                  Search
                </button>
              </div>
            </div>
          </header>

          {/* <!-- Dashboard Content --> */}
          <main className='p-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {/* <!-- Card 1 --> */}
              <div className='bg-white p-4 rounded-lg shadow-md'>
                <h3 className='text-lg font-semibold text-gray-800'>
                  Total Users
                </h3>
                <p className='mt-2 text-2xl text-blue-600'>1,234</p>
              </div>

              {/* <!-- Card 2 --> */}
              <div className='bg-white p-4 rounded-lg shadow-md'>
                <h3 className='text-lg font-semibold text-gray-800'>Revenue</h3>
                <p className='mt-2 text-2xl text-green-600'>$12,345</p>
              </div>

              {/* <!-- Card 3 --> */}
              <div className='bg-white p-4 rounded-lg shadow-md'>
                <h3 className='text-lg font-semibold text-gray-800'>
                  New Signups
                </h3>
                <p className='mt-2 text-2xl text-red-600'>123</p>
              </div>
            </div>

            {/* <!-- Table --> */}
            <div className='mt-6 bg-white rounded-lg shadow-md overflow-hidden'>
              <table className='min-w-full'>
                <thead className='bg-gray-200'>
                  <tr>
                    <th className='py-3 px-4 text-left text-gray-600'>Name</th>
                    <th className='py-3 px-4 text-left text-gray-600'>Email</th>
                    <th className='py-3 px-4 text-left text-gray-600'>Role</th>
                    <th className='py-3 px-4 text-left text-gray-600'>
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className='bg-gray-50'>
                    <td className='py-3 px-4'>John Doe</td>
                    <td className='py-3 px-4'>john@example.com</td>
                    <td className='py-3 px-4'>Admin</td>
                    <td className='py-3 px-4 text-green-600'>Active</td>
                  </tr>
                  <tr className='bg-white'>
                    <td className='py-3 px-4'>Jane Smith</td>
                    <td className='py-3 px-4'>jane@example.com</td>
                    <td className='py-3 px-4'>User</td>
                    <td className='py-3 px-4 text-green-600'>Active</td>
                  </tr>
                  {/* <!-- Additional rows can go here --> */}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
{
  /* <div>
<button onClick={handleLogout}>Logout</button>
</div> */
}
