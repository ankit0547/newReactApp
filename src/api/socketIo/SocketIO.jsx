import { io } from "socket.io-client";

class SocketIO {
  constructor(authToken) {
    this.socket = io("http://localhost:7800", {
      transports: ["websocket"], // Optional: Ensure WebSocket transport is used
      auth: {
        token: authToken, // Pass the token for authentication
      },
    });
  }

  // emit({ type: "SET_SOCKET_ID", payload: socket.socket.id });

  on(eventName, callback) {
    this.socket.on(eventName, callback);
  }

  emit(eventName, data) {
    this.socket.emit(eventName, data);
  }

  disconnect() {
    this.socket.disconnect();
  }
}

export default SocketIO;
