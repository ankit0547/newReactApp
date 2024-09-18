const accessToken = localStorage.getItem("accessToken"); // Retrieve accessToken from localStorage if exists
const refreshToken = localStorage.getItem("accessToken"); // Retrieve refreshToken from localStorage if exists
const isAuth = accessToken && refreshToken;
const initialState = {
  isUserAuthenticated: !!isAuth, // Convert token to boolean to check if logged in,
  resetPasswordMailSent: false,
  isPasswordReset: false,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_AUTH":
      return { ...state, isUserAuthenticated: action.payload };
    case "SET_RESET_PASSWORD_MAIL_SENT":
      return { ...state, resetPasswordMailSent: action.payload };
    case "SET_RESET_PASSWORD":
      return { ...state, isPasswordReset: true };
    default:
      return state;
  }
};

export default AuthReducer;
