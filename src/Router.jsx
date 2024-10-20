import { lazy, useEffect, useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import ProtectedRoute from "./components/common/protectedRoute";
import { useDispatch } from "react-redux";
import { getAction } from "./redux/util/util";
// import DashboardLayout from "./modules/dashboard/dashboardLayout";
// import Profile from "./modules/dashboard/profile";
const Home = lazy(() => import("./components/home/home"));
const LoginForm = lazy(() => import("./modules/auth/signin/signin"));
const DashHome = lazy(() => import("./modules/dashboard/dashHome"));
const DashboardLayout = lazy(() =>
  // Dashboard layout chunks
  import("./modules/dashboard/dashboardLayout")
);
const SignupForm = lazy(() => import("./modules/auth/signup/signup"));
const ForgotPassword = lazy(() =>
  import("./modules/auth/forgotPassword/ForgotPassword")
);
const ResetPassword = lazy(() =>
  import("./modules/auth/resetPassword/ResetPassword")
);
const Profile = lazy(() => import("./modules/dashboard/profile"));
const NotFound = lazy(() => import("./components/notfound/notfound"));

const routes = [
  {
    path: "/",
    component: <Home />,
    public: true,
  },
  {
    path: "/",
    component: <DashboardLayout />,
    public: false,
    nestedRoutes: [
      {
        path: "/home",
        component: <DashHome />,
        public: false,
      },
      {
        path: "/profile",
        component: <Profile />,
        public: false,
      },
      {
        path: "/settings",
        component: <div>Settings</div>,
        public: false,
      },
    ],
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

const ResetOnPathChange = ({ children }) => {
  const location = useLocation(); // Detect path changes
  const dispatch = useDispatch();
  const prevPath = useRef(location.pathname);

  useEffect(() => {
    if (prevPath.current !== location.pathname) {
      // dispatch(resetState()); // Reset Redux store
      dispatch(getAction("RESET_STATE")); // Reset Redux store
      // alert();
      prevPath.current = location.pathname;
    }
  }, [location.pathname, dispatch]);

  return children; // Render child components
};

const AppRouter = () => {
  const publicRoutes = routes.filter((r) => r.public);
  const privateRoutes = routes.filter((r) => !r.public);

  console.log("rt", privateRoutes);

  return (
    <>
      <ResetOnPathChange>
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
            >
              {rt.nestedRoutes.map((nrt, i) => (
                <Route
                  key={`nested-route-${i}`}
                  path={nrt.path}
                  element={<ProtectedRoute component={nrt.component} />}
                />
              ))}
            </Route>
          ))}

          <Route path='/*' element={<NotFound />} />
        </Routes>
      </ResetOnPathChange>
    </>
  );
};

export default AppRouter;
