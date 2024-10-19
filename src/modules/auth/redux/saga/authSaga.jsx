/* eslint-disable no-unused-vars */
import { put, takeEvery } from "redux-saga/effects";
import {
  getAction,
  ProcessingEnd,
  ProcessingStart,
} from "../../../../redux/util/util";
// import { apiConstants } from "../../../api/constants";
import { invokeApi } from "../../../../api/invokeApi";

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
        yield put(getAction("SET_USER_AUTH", true));
        yield put(ProcessingEnd());
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

function* authSaga() {
  yield takeEvery("USER_LOGIN", loginUser);
  yield takeEvery("USER_LOGOUT", logoutUser);
  yield takeEvery("USER_REGISTER_REQUEST", registerUser);
  yield takeEvery("USER_PASSWORD_FORGOT", forgotPassword);
  yield takeEvery("RESET_PASSWORD", resetPassword);
}

export default authSaga;
