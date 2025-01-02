/* eslint-disable no-unused-vars */
import { put, takeEvery } from "redux-saga/effects";

import {
  getAction,
  ProcessingEnd,
  ProcessingStart,
} from "../../../../redux/util/util";

import { invokeApi } from "../../../../api/invokeApi";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions

function* getUserDetails(action) {
  yield put(ProcessingStart());
  try {
    // Handle form submission logic here
    const data = yield invokeApi("USER_DETAILS", action.payload);
    if (data && data.status === 200) {
      yield put(getAction("SET_USER_DETAILS", data.data));
      yield put(ProcessingEnd());
    }
  } catch (e) {
    yield put({ type: "USER_FETCH_FAILED", message: e.message });
    yield put(ProcessingEnd());
  }
}
function* getAllUsers(action) {
  yield put(ProcessingStart());
  try {
    // Handle form submission logic here
    const data = yield invokeApi("ALL_USERS", action.payload);
    if (data && data.status === 200) {
      yield put(getAction("SET_ALL_USERS", data.data));
      yield put(ProcessingEnd());
    }
  } catch (e) {
    yield put({ type: "USER_FETCH_FAILED", message: e.message });
    yield put(ProcessingEnd());
  }
}

function* groupSaga() {
  yield takeEvery("GET_USER_DETAILS", getUserDetails);
  yield takeEvery("GET_ALL_USERS", getAllUsers);
}

export default groupSaga;
