export const authActionTypes = {
  SET_USER_AUTH: "SET_USER_AUTH",
};

export const setOnlineUsers = (users) => ({
  type: "SET_ONLINE_USERS",
  payload: users,
});

export const setChatRoom = (roomId) => ({
  type: "SET_CHAT_ROOM",
  payload: roomId,
});

export const addMessage = (message) => ({
  type: "ADD_MESSAGE",
  payload: message,
});
