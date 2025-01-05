export const authActionTypes = {
  SET_USER_AUTH: "SET_USER_AUTH",
  INIT_SOCKET: "INIT_SOCKET",
  CLEAR_SOCKET: "CLEAR_SOCKET",
  SET_SOCKET_ID: "SET_SOCKET_ID",
  GET_CHATS: "GET_CHATS",
};

// Action Creators
export const initSocketAction = () => ({ type: authActionTypes.INIT_SOCKET });
export const getAllChats = () => ({ type: authActionTypes.GET_CHATS });
export const clearSocketAction = () => ({ type: authActionTypes.CLEAR_SOCKET });

export const setSocketId = (socketId) => ({
  type: authActionTypes.SET_SOCKET_ID,
  payload: socketId,
});
