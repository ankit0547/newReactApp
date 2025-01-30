export const authActionTypes = {
  SET_USER_AUTH: "SET_USER_AUTH",
};

export const setOnlineUsers = (users) => ({
  type: "SET_ONLINE_USERS",
  payload: users,
});

export const selectCurrentChat = (chatId) => ({
  type: "SET_SELECTED_CHAT",
  payload: chatId,
});

export const addMessage = (message) => ({
  type: "ADD_MESSAGE",
  payload: message,
});
export const newDm = (data) => ({
  type: "NEW_DM",
  payload: data,
});
