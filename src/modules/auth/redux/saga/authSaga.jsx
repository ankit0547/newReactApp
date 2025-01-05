/* eslint-disable no-unused-vars */
import { put, takeEvery, takeLatest, call, take } from "redux-saga/effects";
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
import { setSocketId } from "../../../dashboard/redux/actions";
import { eventChannel } from "redux-saga";
import { createSocketChannel } from "../../../../api/socketIo/channel";

let socket; // Declare the socket instance globally within the saga module

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* loginUser(action) {
  try {
    yield put(ProcessingStart());
    // Handle form submission logic here
    const data = yield invokeApi("USER_LOGIN", action.payload);

    if (data) {
      const { accessToken, refreshToken } = data.data;
      console.log("formData", accessToken, refreshToken);

      if (accessToken && refreshToken) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
      }
      const localAccessToken = localStorage.getItem("accessToken");
      const localRefreshToken = localStorage.getItem("refreshToken");

      if (localAccessToken && localRefreshToken) {
        socket = yield new SocketIO(localAccessToken);
        // Wait for the socket connection to be established
        yield new Promise((resolve) => socket.on("connect", resolve));
        // Wait for the socket to connect
        // Create a channel for socket events

        const socketChannel = yield call(createSocketChannel, socket);
        // eslint-disable-next-line no-debugger
        // debugger;
        console.log("socket", socket.socket.id);
        const session = yield invokeApi("CHAT_SESSION", {
          userId: data.data.user._id,
          socketId: socket.socket.id,
        });

        yield put(getAction("SET_USER_AUTH", true));
        yield put(ProcessingEnd());
        // Listen to events from the channel
        while (true) {
          const action = yield take(socketChannel);
          yield put(action); // Dispatch the action (e.g., SET_SOCKET_ID or NEW_MESSAGE)
        }
      }
    }
  } catch (e) {
    console.log(">>>>", e);
    // yield put({ type: "SET_AUTH_SRVER_ERROR", message: e.message });
    yield put(getAction("SET_AUTH_SRVER_ERROR", e.message));
    yield put(ProcessingEnd());
  }
}
function* logoutUser(action) {
  yield put(ProcessingStart());
  try {
    // Handle form submission logic here
    const data = yield invokeApi("USER_LOG_OUT");
    if (data && data.status === 200) {
      localStorage.clear();
      // Disconnect the Socket.IO connection
      if (socket) {
        yield call([socket, "disconnect"]);
        socket = null; // Clean up the socket instance
        console.log("Socket disconnected on logout");
      }

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

// Socket Initialization Saga
function* initSocketSaga() {
  try {
    const accessToken = yield localStorage.getItem("accessToken"); // Retrieve token from storage
    if (accessToken && !socket) {
      socket = new SocketIO(accessToken); // Initialize socket
      // Wait for the socket connection to be established
      yield new Promise((resolve) => socket.on("connect", resolve));
      console.log("Socket initialized!");
      // Wait for the socket to connect
      // Create a channel for socket events
      const socketChannel = yield call(createSocketChannel, socket);

      // Listen to events from the channel
      while (true) {
        const action = yield take(socketChannel);
        yield put(action); // Dispatch the action (e.g., SET_SOCKET_ID or NEW_MESSAGE)
      }
    }
  } catch (error) {
    console.error("Failed to initialize socket:", error);
  }
}

// Socket Cleanup Saga
function* clearSocketSaga() {
  if (socket) {
    yield call([socket, "disconnect"]); // Disconnect socket
    console.log("Socket disconnected!");
    socket = null; // Clear socket instance
  }
}

function* authSaga() {
  yield takeEvery("USER_LOGIN", loginUser);
  yield takeEvery("USER_LOGOUT", logoutUser);
  yield takeEvery("USER_REGISTER_REQUEST", registerUser);
  yield takeEvery("USER_PASSWORD_FORGOT", forgotPassword);
  yield takeEvery("RESET_PASSWORD", resetPassword);
  yield takeLatest("FETCH_USER_PERMISSIONS", fetchUserPermissionsSaga);
  yield takeEvery("INIT_SOCKET", initSocketSaga);
  yield takeEvery("CLEAR_SOCKET", clearSocketSaga);
}

export default authSaga;
