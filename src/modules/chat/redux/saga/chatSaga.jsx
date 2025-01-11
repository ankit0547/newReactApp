/* eslint-disable no-unused-vars */
import { call, fork, put, take, takeEvery } from "redux-saga/effects";

import {
  getAction,
  ProcessingEnd,
  ProcessingStart,
} from "../../../../redux/util/util";

import { invokeApi } from "../../../../api/invokeApi";
import { createSocketChannel } from "../../../../api/socketIo/channel";
import SocketIO from "../../../../api/socketIo/SocketIO";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
let socketInstance;
function* watchSocketEvents(authToken) {
  // eslint-disable-next-line no-debugger
  debugger;
  socketInstance = yield new SocketIO(authToken);
  yield new Promise((resolve) => socketInstance.on("connect", resolve));
  // Notify the server when the user logs in
  socketInstance.emit("userLoggedIn", authToken.userId);
  const socketChannel = yield call(createSocketChannel, socketInstance.socket);

  // console.log(socketChannel);

  try {
    // join user online

    while (true) {
      const action = yield take(socketChannel);
      yield put(action);
    }
  } catch (error) {
    console.error("Socket error:", error);
  }
}

function* chatSaga() {
  const localAccessToken = localStorage.getItem("accessToken");
  yield takeEvery("AUTH_SUCCESS", watchSocketEvents, localAccessToken);
}

export default chatSaga;
