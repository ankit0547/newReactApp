import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAction } from "../../../redux/util/util";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/common/Button/Button";
import NavLink from "../../../components/common/NavLink";
import TextField from "../../../components/common/TextField/TextField";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { isUserAuthenticated, authServerError } = useSelector(
    (state) => state.AuthState
  );
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getAction("USER_LOGIN", formData));
  };

  useEffect(() => {
    if (isUserAuthenticated) {
      navigate("/dashboard");
    }
    if (authServerError) {
      setError(authServerError);
    }
  }, [isUserAuthenticated, navigate, authServerError]);
  useEffect(() => {
    if (isUserAuthenticated) {
      navigate("/dashboard");
    }
  }, []);

  console.log("formData", formData);

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg'>
        <h2 className='text-2xl font-bold text-center'>Log In</h2>
        {error && <p className='text-red-500 text-center mb-4'>{error}</p>}
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <TextField
              label='Email'
              type='email'
              name='email'
              id='email'
              isRequired
              value={formData.email}
              handleChange={handleChange}
            />
          </div>
          <div>
            <TextField
              label='Password'
              type='password'
              name='password'
              id='password'
              isRequired
              value={formData.password}
              handleChange={handleChange}
            />
          </div>
          <Button label={"Sign In"} type='submit' />
        </form>
        <div className='mt-4 text-center'>
          <NavLink to='/register'>Dont have Account? Register</NavLink>
        </div>
        <div className='mt-4 text-center'>
          <NavLink to='/forgot-password'> Forgot Password ?</NavLink>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
