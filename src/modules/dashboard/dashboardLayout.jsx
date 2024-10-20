import { useDispatch, useSelector } from "react-redux";
import { getAction } from "../../redux/util/util";
import { Suspense, useEffect } from "react";
import Sidebar from "./sidebar";
import DashHeader from "./dashHeader";
import { Outlet } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const { userDetails } = useSelector((state) => state.AuthState);

  console.log("userDetails", userDetails);
  useEffect(() => {
    dispatch(getAction("GET_USER_DETAILS"));
  }, []);
  // useEffect(() => {
  //   if (Object.keys(userDetails).length > 0) {
  //     toast("Wow so easy!");
  //   }
  // }, [userDetails]);

  return (
    <div>
      {/* <ToastContainer /> */}
      {/* <!-- Sidebar --> */}
      <div className='flex h-screen'>
        <Sidebar />
        {/* <!-- Main Content --> */}
        <div className='flex-grow'>
          {/* <!-- Top Bar --> */}
          <DashHeader />
          {/* <!-- Dashboard Content --> */}
          <main className='p-6'>
            {/* <DashHome /> */}
            <Suspense fallback={<div>Loading...</div>}>
              <Outlet /> {/* Renders the nested route component here */}
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
{
  /* <div>
<button onClick={handleLogout}>Logout</button>
</div> */
}
