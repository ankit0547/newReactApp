// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { getAction } from "../../redux/util/util";

const DashHome = () => {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getAction("GET_USER_DETAILS"));
  // }, []);
  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {/* <!-- Card 1 --> */}
        <div className='bg-white p-4 rounded-lg shadow-md'>
          <h3 className='text-lg font-semibold text-gray-800'>Total Users</h3>
          <p className='mt-2 text-2xl text-blue-600'>1,234</p>
        </div>

        {/* <!-- Card 2 --> */}
        <div className='bg-white p-4 rounded-lg shadow-md'>
          <h3 className='text-lg font-semibold text-gray-800'>Revenue</h3>
          <p className='mt-2 text-2xl text-green-600'>$12,345</p>
        </div>

        {/* <!-- Card 3 --> */}
        <div className='bg-white p-4 rounded-lg shadow-md'>
          <h3 className='text-lg font-semibold text-gray-800'>New Signups</h3>
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
              <th className='py-3 px-4 text-left text-gray-600'>Status</th>
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
    </div>
  );
};

export default DashHome;
