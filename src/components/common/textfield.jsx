/* eslint-disable react/prop-types */
const TextField = ({ handleChange, value, label, type, name, id }) => {
  //   const { onChange, values, label, type, name, id } = props;
  return (
    <div className=''>
      <label htmlFor={id} className='block text-sm font-medium text-gray-700'>
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={handleChange}
        required
        className='w-full px-3 py-2 mt-1 text-gray-700 border rounded-md focus:outline-none focus:ring focus:ring-indigo-500'
      />
    </div>
  );
};

export default TextField;
