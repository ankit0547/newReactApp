import PropType from "prop-types";
const Button = ({
  handleClick = undefined,
  label = "Button",
  type = "",
  name = "button",
  id = "button",
}) => {
  return (
    <button
      id={id}
      name={name}
      type={type}
      onClick={handleClick}
      className='w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-500'
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  handleClick: PropType.func,
  label: PropType.string,
  type: PropType.string,
  name: PropType.string,
  id: PropType.string,
};

export default Button;
