const apiEndpoint = import.meta.env.VITE_APP_API_URL;
export const apiConstants = [
  {
    actionType: "USER_LOGIN",
    endpoint: `${apiEndpoint}/users/login`,
    method: "POST",
  },
  {
    actionType: "USER_SIGNUP",
    endpoint: `${apiEndpoint}/users/register`,
    method: "POST",
  },
  {
    actionType: "USER_LOG_OUT",
    endpoint: `${apiEndpoint}/users/logout`,
    method: "POST",
  },
  {
    actionType: "USER_FORGOT_PASSWORD",
    endpoint: `${apiEndpoint}/users/forgot-password`,
    method: "POST",
  },
  {
    actionType: "USER_PASSWORD_RESET",
    endpoint: `${apiEndpoint}/users/reset-password/:resetToken`,
    method: "POST",
  },
];
