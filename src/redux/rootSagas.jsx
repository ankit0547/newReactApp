import { all } from "redux-saga/effects";
import authSaga from "../modules/auth/saga/authSaga";

function* rootSaga() {
  yield all([authSaga()]);
  // code after all-effect
}

export default rootSaga;
