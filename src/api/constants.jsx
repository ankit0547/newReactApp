// const apiEndpoint = import.meta.env.VITE_APP_API_URL;
export const apiConstants = {
  USER_LOGIN: {
    endpoint: `/auth/login`,
    method: "POST",
  },
  USER_SIGNUP: {
    endpoint: `/user/register`,
    method: "POST",
  },
  USER_LOG_OUT: {
    endpoint: `/auth/logout`,
    method: "POST",
  },
  USER_FORGOT_PASSWORD: {
    endpoint: `/auth/forgot-password`,
    method: "POST",
  },
  USER_PASSWORD_RESET: {
    endpoint: `/auth/reset-password/:resetToken`,
    method: "POST",
  },
  USER_DETAILS: {
    endpoint: `/user`,
    method: "GET",
  },
  GET_RBAC: {
    endpoint: `/auth/resources`,
    method: "GET",
  },
  ALL_USERS: {
    endpoint: `/user/all`,
    method: "GET",
  },
  CREATE_NEW_CHAT_OR_RETRIVE: {
    endpoint: `/chat/c/:receiverId`,
    method: "POST",
  },
  GET_ALL_CHATS: {
    endpoint: `/chat`,
    method: "GET",
  },
};
