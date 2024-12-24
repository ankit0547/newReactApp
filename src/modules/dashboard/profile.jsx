import { useSelector } from "react-redux";
import TextField from "../../components/common/TextField/TextField";

const Profile = () => {
  const { userDetails } = useSelector((state) => state.AuthState);
  return (
    <div>
      <h2 className='text-2xl font-bold text-center mb-6'>Update Profile</h2>

      {/* <!-- Profile Form --> */}
      <form className='space-y-6'>
        <div>
          <TextField
            label='Username'
            type='text'
            name='username'
            id='username'
            isRequired
            value={userDetails?.username}
            placeHolder='Username'
            handleChange={() => undefined}
          />
        </div>
        <div>
          <TextField
            label='Email'
            type='text'
            name='email'
            id='email'
            isRequired
            disabled
            value={userDetails?.email}
            placeHolder='email'
            handleChange={() => undefined}
          />
        </div>
        {/* <!-- Name Field --> */}
        <div>
          <TextField
            label='First Name'
            type='text'
            name='firstName'
            id='firstName'
            isRequired
            value={userDetails?.firstName}
            placeHolder='First Name'
            handleChange={() => undefined}
          />
        </div>
        <div>
          <TextField
            label='Last Name'
            type='text'
            name='lastName'
            id='lastName'
            isRequired
            value={userDetails?.lastName}
            placeHolder='Last Name'
            handleChange={() => undefined}
          />
        </div>
        <div>
          <TextField
            label='Address 1'
            type='text'
            name='address1'
            id='address1'
            isRequired
            value={""}
            placeHolder='Address 1'
            handleChange={() => undefined}
          />
        </div>
        <div>
          <TextField
            label='Address 2'
            type='text'
            name='address2'
            id='address2'
            isRequired
            value={""}
            placeHolder='Address 2'
            handleChange={() => undefined}
          />
        </div>
        <div>
          <TextField
            label='City'
            type='text'
            name='city'
            id='city'
            isRequired
            value={""}
            placeHolder='City'
            handleChange={() => undefined}
          />
        </div>
        <div>
          <TextField
            label='Postal code'
            type='text'
            name='postalCode'
            id='postalCode'
            isRequired
            value={""}
            placeHolder='Postal code'
            handleChange={() => undefined}
          />
        </div>
        <div>
          <TextField
            label='Country'
            type='text'
            name='country'
            id='country'
            isRequired
            value={""}
            placeHolder='Country'
            handleChange={() => undefined}
          />
        </div>

        {/* <!-- Submit Button --> */}
        <div className='flex justify-center'>
          <button
            type='submit'
            className='w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
