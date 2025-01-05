import { authActionTypes } from "./actions";

const accessToken = localStorage.getItem("accessToken"); // Retrieve accessToken from localStorage if exists
const refreshToken = localStorage.getItem("accessToken"); // Retrieve refreshToken from localStorage if exists
const isAuth = accessToken && refreshToken;
const initialState = {
  isUserAuthenticated: !!isAuth, // Convert token to boolean to check if logged in,
  resetPasswordMailSent: false,
  isPasswordReset: false,
  authServerError: null,
  userDetails: null,
  rbac: null,
  socketId: null,
};

const AuthReducer = (state = initialState, action) => {
  // eslint-disable-next-line no-debugger
  // debugger;
  switch (action.type) {
    case "SET_USER_AUTH":
      return { ...state, isUserAuthenticated: action.payload };
    case "SET_RESET_PASSWORD_MAIL_SENT":
      return { ...state, resetPasswordMailSent: action.payload };
    case "SET_RESET_PASSWORD":
      return { ...state, isPasswordReset: true };
    case "SET_AUTH_SRVER_ERROR":
      return { ...state, authServerError: action.payload };
    case "SET_USER_DETAILS":
      return { ...state, userDetails: action.payload };
    case authActionTypes.FETCH_USER_PERMISSIONS_SUCCESS:
      return {
        ...state,
        role: action.payload,
      };
    case "SET_SOCKET_ID":
      return { ...state, socketId: action.payload };
    default:
      return state;
  }
};

export default AuthReducer;
