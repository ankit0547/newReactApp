/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component }) => {
  const { isUserAuthenticated } = useSelector((state) => state.AuthState);
  return isUserAuthenticated ? component : <Navigate to='/login' />;
};

export default ProtectedRoute;
