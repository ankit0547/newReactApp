import { all } from "redux-saga/effects";
import authSaga from "../modules/auth/redux/saga/authSaga";
import dashboardSaga from "../modules/dashboard/redux/saga/dashboardSaga";

function* rootSaga() {
  yield all([authSaga(), dashboardSaga()]);
  // code after all-effect
}

export default rootSaga;
