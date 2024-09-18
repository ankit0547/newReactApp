import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/home/home";
import NotFound from "./components/notfound/notfound";
import Dashboard from "./modules/dashboard/dashboard";
import LoginForm from "./modules/auth/signin/signin";
import SignupForm from "./modules/auth/signup/signup";
import ProtectedRoute from "./components/common/protectedRoute";
import ForgotPassword from "./modules/auth/forgotPassword/ForgotPassword";
import ResetPassword from "./modules/auth/resetPassword/ResetPassword";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route
        path='/dashboard'
        element={<ProtectedRoute component={<Dashboard />} />}
      />
      <Route path='/login' element={<LoginForm />} />
      <Route path='/logout' element={<SignupForm />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/reset-password/:resetToken' element={<ResetPassword />} />
      <Route path='/*' element={<NotFound />} />
    </Routes>
  );
}

export default App;
