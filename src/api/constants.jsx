const apiEndpoint = import.meta.env.VITE_APP_API_URL;
export const apiConstants = [
  {
    actionType: "USER_LOGIN",
    endpoint: `${apiEndpoint}/user/login`,
    method: "POST",
  },
  {
    actionType: "USER_SIGNUP",
    endpoint: `${apiEndpoint}/user/register`,
    method: "POST",
  },
  {
    actionType: "USER_LOG_OUT",
    endpoint: `${apiEndpoint}/user/logout`,
    method: "POST",
  },
  {
    actionType: "USER_FORGOT_PASSWORD",
    endpoint: `${apiEndpoint}/user/forgot-password`,
    method: "POST",
  },
  {
    actionType: "USER_PASSWORD_RESET",
    endpoint: `${apiEndpoint}/user/reset-password/:resetToken`,
    method: "POST",
  },
  {
    actionType: "USER_DETAILS",
    endpoint: `${apiEndpoint}/user`,
    method: "GET",
  },
];
