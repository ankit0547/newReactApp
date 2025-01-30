import { eventChannel } from "redux-saga";
// import { setOnlineUsers } from "../../modules/chat/redux/actions";

export function createSocketChannel(socket) {
  return eventChannel((emit) => {
    const handleStatusChange = (data) => {
      emit({ type: "userStatusChange", data });
    };

    const handleReconnect = () => {
      console.log("Socket reconnected");
      emit({ type: "reconnect" });
    };

    const handleDisconnect = () => {
      console.log("Socket disconnected");
      emit({ type: "disconnect" });
    };

    // Listen for incoming messages from the server
    socket.on("receiveMessage", (message) => {
      emit({ type: "RECEIVE_MESSAGE", payload: message });
    });

    socket.on("messageSent", (message) => {
      emit({ type: "SEND_MESSAGE", payload: message });
    });

    socket.on("userStatusChange", handleStatusChange);
    socket.on("connect", handleReconnect);
    socket.on("disconnect", handleDisconnect);

    return () => {
      socket.off("userStatusChange", handleStatusChange);
      socket.off("connect", handleReconnect);
      socket.off("disconnect", handleDisconnect);
    };
  });
}
