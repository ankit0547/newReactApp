import { eventChannel } from "redux-saga";

export function createSocketChannel(socket) {
  return eventChannel((emit) => {
    socket.on("connect", () => {
      console.log("Socket connected:", socket.socket.id);
      emit({ type: "SET_SOCKET_ID", payload: socket.socket.id });
    });

    socket.on("message", (msg) => {
      console.log("New message:", msg);
      emit({ type: "NEW_MESSAGE", payload: msg });
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
      emit({ type: "SOCKET_DISCONNECTED" });
    });

    // Return a function to unsubscribe from the events
    return () => {
      socket.disconnect();
    };
  });
}
