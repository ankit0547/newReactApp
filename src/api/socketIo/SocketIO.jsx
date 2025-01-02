import { io } from "socket.io-client";

class SocketIO {
  constructor() {
    this.socket = io("http://localhost:7800");
  }

  on(eventName, callback) {
    this.socket.on(eventName, callback);
  }

  emit(eventName, data) {
    this.socket.emit(eventName, data);
  }
}

export default SocketIO;
