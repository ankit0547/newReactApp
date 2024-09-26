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
      <div>First Name: {userDetails?.profile.firstName}</div>
      <div>Last Name: {userDetails?.profile.lastName}</div>
      <div>Username: {userDetails?.profile.username}</div>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;
