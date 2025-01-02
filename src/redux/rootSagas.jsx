import { all } from "redux-saga/effects";
import authSaga from "../modules/auth/redux/saga/authSaga";
import dashboardSaga from "../modules/dashboard/redux/saga/dashboardSaga";
import groupSaga from "../modules/groups/redux/saga/groupSaga";
import chatSaga from "../modules/chat/redux/saga/chatSaga";

function* rootSaga() {
  yield all([authSaga(), dashboardSaga(), groupSaga(), chatSaga()]);
  // code after all-effect
}

export default rootSaga;
