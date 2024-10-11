import TextField from "../../components/common/TextField/TextField";

const Profile = () => {
  return (
    <div>
      <h2 className='text-2xl font-bold text-center mb-6'>Update Profile</h2>

      {/* <!-- Profile Form --> */}
      <form className='space-y-6'>
        {/* <!-- Name Field --> */}
        <div>
          <TextField
            label='First Name'
            type='text'
            name='firstName'
            id='firstName'
            isRequired
            value={""}
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
            value={""}
            placeHolder='Last Name'
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
