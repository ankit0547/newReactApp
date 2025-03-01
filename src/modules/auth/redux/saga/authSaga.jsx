import {
  put,
  takeEvery,
  takeLatest,
  call,
  take,
  fork,
  cancel,
  // cancel,
} from "redux-saga/effects";
import {
  getAction,
  ProcessingEnd,
  ProcessingStart,
} from "../../../../redux/util/util";
// import { apiConstants } from "../../../api/constants";
import { invokeApi } from "../../../../api/invokeApi";
import {
  fetchUserPermissionsFailure,
  fetchUserPermissionsSuccess,
} from "../actions";
import SocketIO from "../../../../api/socketIo/SocketIO";
import {
  connectSocket,
  disconnectSocket,
  setUserStatus,
  SOCKET_CONNECT,
  SOCKET_DISCONNECT,
} from "../../../dashboard/redux/actions";

import { createSocketChannel } from "../../../../api/socketIo/channel";
import { apiConstants } from "../../../../api/constants";

let socketInstance;
function* handleSocketConnection({ payload }) {
  if (!socketInstance) {
    socketInstance = yield new SocketIO(payload);
  } else {
    socketInstance.reconnect(payload);
  }

  const socketChannel = yield call(createSocketChannel, socketInstance.socket);

  try {
    while (true) {
      const event = yield take(socketChannel);
      if (event.type === "userStatusChange") {
        console.log("event.data", event.data);
        yield put(setUserStatus(event.data)); // Dispatch Redux action
      }
    }
  } catch (error) {
    console.error("Socket connection error:", error);
  }
}
function* watchSocketConnection() {
  let socketTask;
  // // eslint-disable-next-line no-debugger
  // debugger;
  yield takeLatest(SOCKET_CONNECT, function* ({ payload }) {
    if (socketTask) {
      yield cancel(socketTask); // Cancel existing socket task
    }
    socketTask = yield fork(handleSocketConnection, { payload });
  });

  yield takeLatest(SOCKET_DISCONNECT, function* () {
    if (socketInstance) {
      socketInstance.disconnect();
      socketInstance = null;
    }
    if (socketTask) {
      yield cancel(socketTask); // Cancel the socket task
    }
  });
}

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* loginUser(action) {
  try {
    yield put(ProcessingStart());
    // Handle form submission logic here
    const data = yield invokeApi(apiConstants.USER_LOGIN, action.payload);

    if (data) {
      const { accessToken, refreshToken } = data.data;

      if (accessToken && refreshToken) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("userId", data.data.user._id);
      }
      const localAccessToken = localStorage.getItem("accessToken");
      const localRefreshToken = localStorage.getItem("refreshToken");
      if (localAccessToken && localRefreshToken) {
        yield put(getAction("SET_ACCESS_TOCKEN", localAccessToken));
        yield put(getAction("SET_USER_AUTH", true));
        yield put(connectSocket(localAccessToken)); // Connect to the socket on successful login
        yield put(ProcessingEnd());
      }
    }
  } catch (e) {
    // console.log(">>>>", e);
    // yield put({ type: "SET_AUTH_SRVER_ERROR", message: e.message });
    yield put(getAction("SET_AUTH_SRVER_ERROR", e.message));
    yield put(ProcessingEnd());
  }
}
function* logoutUser() {
  yield put(ProcessingStart());
  try {
    // Handle form submission logic here
    const data = yield invokeApi(apiConstants.USER_LOG_OUT);
    if (data && data.status === 200) {
      localStorage.clear();

      // Disconnect the Socket.IO connection
      // if (socket) {
      //   yield call([socket, "disconnect"]);
      //   socket = null; // Clean up the socket instance
      //   console.log("Socket disconnected on logout");
      // }

      yield put(disconnectSocket());
      yield put(getAction("SET_USER_AUTH", false));
      yield put(ProcessingEnd());
    }
  } catch (e) {
    yield put({ type: "USER_FETCH_FAILED", message: e.message });
    yield put(ProcessingEnd());
  }
}

function* registerUser(action) {
  yield put(ProcessingStart());
  try {
    // Handle form submission logic here
    const data = yield invokeApi("USER_SIGNUP", action.payload);
    // eslint-disable-next-line no-debugger
    debugger;
    if (data && data.status === 200) {
      yield put(getAction("SET_USER_DETAILS", data.status));
      yield put(ProcessingEnd());
    }
  } catch (e) {
    yield put({ type: "USER_FETCH_FAILED", message: e.message });
    yield put(ProcessingEnd());
  }
}

function* forgotPassword(action) {
  yield put(ProcessingStart());
  try {
    // Handle form submission logic here
    const data = yield invokeApi("USER_FORGOT_PASSWORD", {
      email: action.payload,
    });
    if (data && data.status === 200) {
      localStorage.clear();
      yield put(getAction("SET_RESET_PASSWORD_MAIL_SENT", true));
      yield put(ProcessingEnd());
    }
  } catch (e) {
    yield put({ type: "USER_FETCH_FAILED", message: e.message });
    yield put(ProcessingEnd());
  }
}

function* resetPassword(action) {
  yield put(ProcessingStart());
  try {
    // Handle form submission logic here
    const data = yield invokeApi(
      "USER_PASSWORD_RESET",
      {
        newPassword: action.payload.password,
      },
      {
        resetToken: action.payload.resetToken,
      }
    );
    if (data && data.status === 200) {
      localStorage.clear();
      yield put(getAction("SET_RESET_PASSWORD"));
      yield put(ProcessingEnd());
    }
  } catch (e) {
    yield put({ type: "USER_FETCH_FAILED", message: e.message });
    yield put(ProcessingEnd());
  }
}

function* fetchUserPermissionsSaga() {
  try {
    yield put(ProcessingStart());
    const response = yield invokeApi("GET_RBAC");
    yield put(fetchUserPermissionsSuccess(response.data));
    yield put(ProcessingEnd());
  } catch (error) {
    yield put(fetchUserPermissionsFailure(error.message));
    yield put(ProcessingEnd());
  }
}

function* authSaga() {
  yield fork(watchSocketConnection);
  yield takeEvery("USER_LOGIN", loginUser);
  yield takeEvery("USER_LOGOUT", logoutUser);
  yield takeEvery("USER_REGISTER_REQUEST", registerUser);
  yield takeEvery("USER_PASSWORD_FORGOT", forgotPassword);
  yield takeEvery("RESET_PASSWORD", resetPassword);
  yield takeLatest("FETCH_USER_PERMISSIONS", fetchUserPermissionsSaga);
}

export default authSaga;
