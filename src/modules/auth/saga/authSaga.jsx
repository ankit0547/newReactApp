/* eslint-disable no-unused-vars */
import { put, takeEvery } from "redux-saga/effects";
import { invokeApi } from "../../../api/invokeApi";
import {
  getAction,
  ProcessingEnd,
  ProcessingStart,
} from "../../../redux/util/util";
import { apiConstants } from "../../../api/constants";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* loginUser(action) {
  try {
    yield put(ProcessingStart());
    // Handle form submission logic here
    const data = yield invokeApi("USER_LOGIN", action.payload);

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
  } catch (e) {
    console.log(">>>>", e);
    yield put({ type: "USER_FETCH_FAILED", message: e.message });
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
  }
}

function* forgotPassword(action) {
  yield put(ProcessingStart());
  try {
    // Handle form submission logic here
    const data = yield invokeApi("USER_FORGOT_PASSWORD", {
      email: action.payload,
    });
    // eslint-disable-next-line no-debugger
    debugger;
    if (data && data.status === 200) {
      localStorage.clear();
      yield put(getAction("SET_RESET_PASSWORD_MAIL_SENT", true));
      yield put(ProcessingEnd());
    }
  } catch (e) {
    yield put({ type: "USER_FETCH_FAILED", message: e.message });
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
    // eslint-disable-next-line no-debugger
    debugger;
    if (data && data.status === 200) {
      localStorage.clear();
      yield put(getAction("SET_RESET_PASSWORD"));
      yield put(ProcessingEnd());
    }
  } catch (e) {
    yield put({ type: "USER_FETCH_FAILED", message: e.message });
  }
}

function* authSaga() {
  yield takeEvery("USER_LOGIN", loginUser);
  yield takeEvery("USER_LOGOUT", logoutUser);
  yield takeEvery("USER_PASSWORD_FORGOT", forgotPassword);
  yield takeEvery("RESET_PASSWORD", resetPassword);
}

export default authSaga;