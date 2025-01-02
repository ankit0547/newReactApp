const initialState = {};

const GroupReducer = (state = initialState, action) => {
  switch (action.type) {
    case "RESET_STATE":
      return initialState;
    default:
      return state;
  }
};

export default GroupReducer;
