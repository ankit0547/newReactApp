// const apiEndpoint = import.meta.env.VITE_APP_API_URL;
export const apiConstants = [
  {
    actionType: "USER_LOGIN",
    endpoint: `/user/login`,
    method: "POST",
  },
  {
    actionType: "USER_SIGNUP",
    endpoint: `/user/register`,
    method: "POST",
  },
  {
    actionType: "USER_LOG_OUT",
    endpoint: `/user/logout`,
    method: "POST",
  },
  {
    actionType: "USER_FORGOT_PASSWORD",
    endpoint: `/user/forgot-password`,
    method: "POST",
  },
  {
    actionType: "USER_PASSWORD_RESET",
    endpoint: `/user/reset-password/:resetToken`,
    method: "POST",
  },
  {
    actionType: "USER_DETAILS",
    endpoint: `/user`,
    method: "GET",
  },
];
