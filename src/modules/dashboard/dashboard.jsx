import { useDispatch } from "react-redux";
import { getAction } from "../../redux/util/util";
// import { useEffect } from "react";

const Dashboard = () => {
  const dispatch = useDispatch();
  // const localAccessToken = localStorage.getItem("accessToken");
  // const localRefreshToken = localStorage.getItem("refreshToken");
  // // eslint-disable-next-line no-debugger
  // debugger;
  // if (localAccessToken && localRefreshToken) {
  //   dispatch(getAction("SET_USER_AUTH", true));
  // }

  //   useEffect(() =)

  const handleLogout = () => {
    dispatch(getAction("USER_LOGOUT"));
  };

  return (
    <div>
      Dashboard
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;
