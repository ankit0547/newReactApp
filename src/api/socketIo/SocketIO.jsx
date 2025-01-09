import { io } from "socket.io-client";

class SocketIO {
  constructor(authToken) {
    this.authToken = authToken;
    this.socket = this.createSocket();
  }
  debugger;
  createSocket() {
    return io("http://localhost:7800", {
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
