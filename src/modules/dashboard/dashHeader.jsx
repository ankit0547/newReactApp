import { useSelector } from "react-redux";

const DashHeader = () => {
  const { userDetails } = useSelector((state) => state.AuthState);
  console.log(userDetails);
  return (
    <>
      <header className="">
        <div className="flex items-center justify-end p-4 bg-white border-b">
          <button
            onClick="logout()"
            className="text-red-600 hover:text-red-800 flex items-center space-x-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H3"
              ></path>
            </svg>
            <span>Logout</span>
          </button>
        </div>

        {/* <div className='flex justify-between items-center'>
          <h2 className='text-xl font-semibold text-gray-800'>
            {`Hi! Welcome ${userDetails?.username}`}
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
        </div> */}
      </header>
    </>
  );
};

export default DashHeader;
