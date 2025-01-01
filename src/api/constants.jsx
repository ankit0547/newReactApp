// const apiEndpoint = import.meta.env.VITE_APP_API_URL;
export const apiConstants = [
  {
    actionType: "USER_LOGIN",
    endpoint: `/auth/login`,
    method: "POST",
  },
  {
    actionType: "USER_SIGNUP",
    endpoint: `/user/register`,
    method: "POST",
  },
  {
    actionType: "USER_LOG_OUT",
    endpoint: `/auth/logout`,
    method: "POST",
  },
  {
    actionType: "USER_FORGOT_PASSWORD",
    endpoint: `/auth/forgot-password`,
    method: "POST",
  },
  {
    actionType: "USER_PASSWORD_RESET",
    endpoint: `/auth/reset-password/:resetToken`,
    method: "POST",
  },
  {
    actionType: "USER_DETAILS",
    endpoint: `/user`,
    method: "GET",
  },
  {
    actionType: "GET_RBAC",
    endpoint: `/auth/resources`,
    method: "GET",
  },
];
