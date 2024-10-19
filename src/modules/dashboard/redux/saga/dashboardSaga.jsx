/* eslint-disable no-unused-vars */
import { put, takeEvery } from "redux-saga/effects";
// import { invokeApi } from "../../../api/invokeApi";
import {
  getAction,
  ProcessingEnd,
  ProcessingStart,
} from "../../../../redux/util/util";
// import { apiConstants } from "../../../api/constants";
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

function* dashboardSaga() {
  yield takeEvery("GET_USER_DETAILS", getUserDetails);
}

export default dashboardSaga;
