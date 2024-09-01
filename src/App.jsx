import { Route, Routes } from "react-router-dom";
import "./App.css";
import SignupForm from "./components/signup/signup";
import Home from "./components/home/home";
import LoginForm from "./components/signin/signin";
import NotFound from "./components/notfound/notfound";
// import ProtectedRoute from "./components/protectedRoute/protectedRoute";
import Dashboard from "./components/dashboard/dashboard";

function App() {
  return (
    <>
      <Routes>
        {/* <Route
          path='/dashboard'
          element={<ProtectedRoute component={<Dashboard />} />}
        /> */}
        {/* <ProtectedRoute path='/dashboard' component={Dashboard} /> */}
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignupForm />} />
        <Route path='/signin' element={<LoginForm />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
