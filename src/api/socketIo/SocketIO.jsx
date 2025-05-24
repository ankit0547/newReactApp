import { io } from "socket.io-client";

class SocketIO {
  constructor(authToken) {
    this.authToken = authToken;
    this.socket = this.createSocket();
  }
  createSocket() {
    const socketURL =
      import.meta.env.VITE_APP_SOCKET_URL || window.location.origin;
    return io(socketURL, {
      path: "/socket.io",
      pingInterval: 1000,
      port: 7800,
      transports: ["websocket"],
      auth: {
        token: this.authToken, // Pass the token for authentication
      },
      reconnection: true, // Enable auto-reconnect
      reconnectionAttempts: 10, // Limit the number of reconnection attempts
      reconnectionDelay: 1000, // Delay between reconnection attempts
    });
  }

  reconnect(authToken) {
    this.authToken = authToken;
    if (this.socket) {
      this.socket.auth.token = authToken;
      this.socket.connect();
    } else {
      this.socket = this.createSocket();
    }
  }

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
