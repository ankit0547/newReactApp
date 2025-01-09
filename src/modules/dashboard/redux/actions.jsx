export const authActionTypes = {
  SET_USER_AUTH: "SET_USER_AUTH",
  INIT_SOCKET: "INIT_SOCKET",
  CLEAR_SOCKET: "CLEAR_SOCKET",
  SET_SOCKET_ID: "SET_SOCKET_ID",
  GET_CHATS: "GET_CHATS",
};

// Action Creators
export const getAllChats = () => ({ type: authActionTypes.GET_CHATS });

export const SOCKET_CONNECT = "SOCKET_CONNECT";
export const SOCKET_DISCONNECT = "SOCKET_DISCONNECT";

export const connectSocket = (authToken) => ({
  type: SOCKET_CONNECT,
  payload: authToken,
});

export const disconnectSocket = () => ({
  type: SOCKET_DISCONNECT,
});

export const setUserStatus = (payload) => ({
  type: "SET_USER_STATUS",
  payload,
});
