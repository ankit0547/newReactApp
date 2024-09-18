// import { useNavigate } from "react-router-dom";
import { invokeApi } from "../../api/invokeApi";
// import invokeApi from "../../api/invokeApi";

const Dashboard = () => {
  // const navigate = useNavigate();

  const handleLogout = () => {
    // eslint-disable-next-line no-debugger
    debugger;
    invokeApi("USER_LOG_OUT");
    // invokeApi("USER_LOG_OUT");
    // res.then((data) => {
    //   if (data.status === 200) {
    //     localStorage.clear();
    //     navigate("/");
    //   }
    //   console.log(data);
    // });
  };

  return (
    <div>
      Dashboard
      <button
        onClick={handleLogout}
        type='button'
        className='w-[10rem] px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-500'
      >
        Log out
      </button>
    </div>
  );
};

export default Dashboard;
