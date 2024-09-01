import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/home/home";
import NotFound from "./components/notfound/notfound";
// import ProtectedRoute from "./components/protectedRoute/protectedRoute";
import Dashboard from "./components/dashboard/dashboard";
import LoginForm from "./modules/auth/signin/signin";
import SignupForm from "./modules/auth/signup/signup";

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/logout' element={<SignupForm />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
