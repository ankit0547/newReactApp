import { useSelector } from "react-redux";

const DashHeader = () => {
  const {userDetails}  = useSelector((state) => state.AuthState);
  console.log(userDetails);
  return (
    <>
      <header className='bg-white shadow-md py-4 px-6'>
        <div className='flex justify-between items-center'>
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
        </div>
      </header>
    </>
  );
};

export default DashHeader;
