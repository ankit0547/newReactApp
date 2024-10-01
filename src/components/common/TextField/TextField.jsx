import PropType from "prop-types";
import styles from "./Textfield.module.css";
import { useState } from "react";

const EyeShow = () => (
  <svg
    className='h-5 w-5 text-blue-500'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' />{" "}
    <circle cx='12' cy='12' r='3' />
  </svg>
);
const EyeHide = () => (
  <svg
    className='h-5 w-5 text-blue-500'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21'
    />
  </svg>
);

const TextField = ({
  handleChange,
  value,
  label,
  type,
  name,
  id,
  isRequired,
  isPrimary,
  isSecondary,
}) => {
  const [hidePassword, setHidePassword] = useState(false);

  const { textField, primary, secondary } = styles;

  return (
    <div
      className={`${textField} ${isPrimary && primary}  ${
        isSecondary && secondary
      }`}
    >
      <label htmlFor={id} className='block text-sm font-medium text-gray-700'>
        {label}
      </label>
      <input
        type={!hidePassword ? type : "text"}
        name={name}
        id={id}
        value={value}
        onChange={handleChange}
        required={isRequired}
        autoComplete={type === "password" ? "true" : "false"}
        className='w-full
        } px-3 py-2 mt-1 text-gray-700 border rounded-md focus:outline-none focus:ring focus:ring-indigo-500'
      />
      {type === "password" && (
        <span onClick={() => setHidePassword(!hidePassword)}>
          {hidePassword ? <EyeShow /> : <EyeHide />}
        </span>
      )}
    </div>
  );
};

TextField.propTypes = {
  handleChange: PropType.func,
  value: PropType.string,
  label: PropType.string,
  type: PropType.string,
  name: PropType.string,
  id: PropType.string,
  isRequired: PropType.bool,
  isPrimary: PropType.bool,
  isSecondary: PropType.bool,
};

TextField.defaultProps = {
  handleChange: undefined,
  value: "Testing",
  label: "",
  type: "",
  name: "",
  id: "",
  isRequired: true,
  isPrimary: true,
  isSecondary: undefined,
};
export default TextField;
