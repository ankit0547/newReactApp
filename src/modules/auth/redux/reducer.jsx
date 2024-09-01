const initialState = {
  isUserAuthenticated: false,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, isUserAuthenticated: !state.isUserAuthenticated };
    case "DECREMENT":
      return { ...state, counter: state.counter - 1 };
    default:
      return state;
  }
};

export default AuthReducer;
