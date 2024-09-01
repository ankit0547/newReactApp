import { all } from "axios";
import authSaga from "../modules/auth/saga/authSaga";

export default function* rootSaga() {
  yield all([authSaga()]);
  // code after all-effect
}
