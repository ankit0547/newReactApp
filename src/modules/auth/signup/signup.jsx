import { useState, useEffect } from "react";
// import { invokeApi } from "../../../api/invokeApi";
import { useDispatch, useSelector } from "react-redux";
import { getAction } from "../../../redux/util/util";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/common/Button/Button";
import TextField from "../../../components/common/TextField/TextField";
import NavLink from "../../../components/common/NavLink";

const SignupForm = () => {
  const { userDetails } = useSelector((state) => state.AuthState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
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
    // Handle form submission logic here
    dispatch(getAction("USER_REGISTER_REQUEST", formData));
    console.log("Form submitted:", formData);
  };

  useEffect(() => {
    if (userDetails === 200) {
      navigate("/login");
    }
  }, [userDetails]);

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg'>
        <h2 className='text-2xl font-bold text-center'>Sign Up</h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <TextField
              label='First Name'
              type='firstName'
              name='firstName'
              id='firstName'
              isRequired
              value={formData.firstName}
              handleChange={handleChange}
            />
          </div>
          <div>
            <TextField
              label='Last Name'
              type='lastName'
              name='lastName'
              id='lastName'
              isRequired
              value={formData.lastName}
              handleChange={handleChange}
            />
          </div>
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
          <Button label={"Sign Up"} type='submit' />
        </form>
        <div className='mt-4 text-center'>
          <NavLink to='/login'>Already have account? Login</NavLink>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
