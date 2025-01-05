const initialState = {
  allChats: [],
};

const ChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ALL_CHATS":
      return { ...state, allChats: action.payload };
    case "RESET_STATE":
      return initialState;
    default:
      return state;
  }
};

export default ChatReducer;
