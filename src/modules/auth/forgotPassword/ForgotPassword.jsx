// src/components/ForgotPassword.js
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAction } from "../../../redux/util/util";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { resetPasswordMailSent } = useSelector((state) => state.AuthStates);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(getAction("USER_PASSWORD_FORGOT", email));
    // Perform the password reset logic (e.g., call an API)
  };

  useEffect(() => {
    if (resetPasswordMailSent) {
      setMessage(
        "If this email is registered, a reset link will be sent to you."
      );
    }
  }, [resetPasswordMailSent]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>
        {message && (
          <p className="text-green-500 text-center mb-4">{message}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your email"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 transition duration-150"
          >
            Reset Password
          </button>
        </form>
        <div className="mt-4 text-center">
          <a href="/login" className="text-sm text-indigo-600 hover:underline">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
