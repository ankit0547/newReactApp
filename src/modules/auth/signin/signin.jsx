import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAction } from "../../../redux/util/util";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isUserAuthenticated } = useSelector((state) => state.AuthState);
  const [formData, setFormData] = useState({
    username: "",
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
  }, [isUserAuthenticated, navigate]);
  useEffect(() => {
    if (isUserAuthenticated) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg'>
        <h2 className='text-2xl font-bold text-center'>Log In</h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label
              htmlFor='username'
              className='block text-sm font-medium text-gray-700'
            >
              Username
            </label>
            <input
              type='username'
              name='username'
              id='username'
              value={formData.username}
              onChange={handleChange}
              required
              className='w-full px-3 py-2 mt-1 text-gray-700 border rounded-md focus:outline-none focus:ring focus:ring-indigo-500'
            />

            {/* <TextField
              label='Username'
              type='username'
              name='username'
              id='username'
              value={formData.username}
              onChange={handleChange}
            /> */}
          </div>
          <div>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-700'
            >
              Password
            </label>
            <input
              type='password'
              name='password'
              id='password'
              value={formData.password}
              onChange={handleChange}
              required
              className='w-full px-3 py-2 mt-1 text-gray-700 border rounded-md focus:outline-none focus:ring focus:ring-indigo-500'
            />
          </div>
          <button
            type='submit'
            className='w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-500'
          >
            Log In
          </button>
        </form>
        <div className='mt-4 text-center'>
          <a
            href='/forgot-password'
            className='text-sm text-indigo-600 hover:underline'
          >
            Forgot Password ?
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
