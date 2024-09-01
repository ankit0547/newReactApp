/* eslint-disable no-unused-vars */
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
// import Api from "...";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchUser(action) {
  try {
    // eslint-disable-next-line no-debugger
    debugger;
    console.log("???????????", action);
    // const user = yield call(Api.fetchUser, action.payload.userId);
    // yield put({ type: "USER_FETCH_SUCCEEDED", user: user });
  } catch (e) {
    yield put({ type: "USER_FETCH_FAILED", message: e.message });
  }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* authSaga() {
  yield takeEvery("INCREMENT", fetchUser);
}

export default authSaga;
