// import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAction } from "../../redux/util/util";
// import invokeApi from "../../api/invokeApi";

const Dashboard = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userDetails } = useSelector((state) => state.AuthState);

  const handleLogout = () => {
    dispatch(getAction("USER_LOG_OUT"));
  };

  console.log("userDetails", userDetails);
  useEffect(() => {
    dispatch(getAction("GET_USER_DETAILS"));
  });

  return (
    <div>
      Dashboard??????????????
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
