/* eslint-disable no-unused-vars */
import { put, takeEvery } from "redux-saga/effects";

import {
  getAction,
  ProcessingEnd,
  ProcessingStart,
} from "../../../../redux/util/util";

import { invokeApi } from "../../../../api/invokeApi";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions

function* getAllChats(action) {
  yield put(ProcessingStart());
  try {
    // Handle form submission logic here
    const data = yield invokeApi("GET_ALL_CHATS");
    console.log("ALL>>", data.data);
    if (data && data.status === 200) {
      yield put(getAction("SET_ALL_CHATS", data.data));
      yield put(ProcessingEnd());
    }
  } catch (e) {
    yield put({ type: "USER_FETCH_FAILED", message: e.message });
    yield put(ProcessingEnd());
  }
}

function* chatSaga() {
  yield takeEvery("GET_CHATS", getAllChats);
}

export default chatSaga;
