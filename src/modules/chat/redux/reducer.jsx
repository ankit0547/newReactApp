const initialState = {};

const ChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case "RESET_STATE":
      return initialState;
    default:
      return state;
  }
};

export default ChatReducer;
