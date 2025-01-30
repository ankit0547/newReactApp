const initialState = {
  allChats: [],
  onlineUsers: [],
  activeRoom: null,
  messages: [],
};

const ChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ALL_CHATS": {
      return { ...state, allChats: action.payload };
    }

    case "SET_ONLINE_USERS":
      return { ...state, onlineUsers: action.payload };
    case "SET_CHAT_ROOM":
      return { ...state, activeRoom: action.payload };
    case "ADD_MESSAGE":
      return { ...state, messages: [...state.messages, action.payload] };
    case "RESET_STATE":
      return initialState;
    default:
      return state;
  }
};

export default ChatReducer;
