import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/common/protectedRoute";
import Dashboard from "./modules/dashboard/dashboard";
import Home from "./components/home/home";
import LoginForm from "./modules/auth/signin/signin";
import SignupForm from "./modules/auth/signup/signup";
import NotFound from "./components/notfound/notfound";
import ForgotPassword from "./modules/auth/forgotPassword/ForgotPassword";
import ResetPassword from "./modules/auth/resetPassword/ResetPassword";

const routes = [
  {
    path: "/",
    component: <Home />,
    public: true,
  },
  {
    path: "/dashboard",
    component: <Dashboard />,
    public: false,
  },
  {
    path: "/login",
    component: <LoginForm />,
    public: true,
  },
  {
    path: "/register",
    component: <SignupForm />,
    public: true,
  },
  {
    path: "/forgot-password",
    component: <ForgotPassword />,
    public: true,
  },
  {
    path: "/reset-password/:resetToken",
    component: <ResetPassword />,
    public: true,
  },
];

const AppRouter = () => {
  const publicRoutes = routes.filter((r) => r.public);
  const privateRoutes = routes.filter((r) => !r.public);

  return (
    <>
      <Routes>
        {publicRoutes.map((rt, i) => (
          <Route
            key={`public-route-${i}`}
            path={rt.path}
            element={rt.component}
          />
        ))}
        {privateRoutes.map((rt, i) => (
          <Route
            key={`private-route-${i}`}
            path={rt.path}
            element={<ProtectedRoute component={rt.component} />}
          />
        ))}
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRouter;
