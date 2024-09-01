/* eslint-disable react/prop-types */

import { Route } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  // const token = localStorage.getItem("accessToken");

  // const isTokenAvail = token ? true : false;

  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default ProtectedRoute;
