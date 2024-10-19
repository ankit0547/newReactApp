const initialState = {
  userDetails: null,
};

const DashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_DETAILS":
      return { ...state, userDetails: action.payload };
    case "RESET_STATE":
      return initialState;
    default:
      return state;
  }
};

export default DashboardReducer;
