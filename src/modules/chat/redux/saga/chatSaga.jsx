/* eslint-disable no-unused-vars */
import { call, fork, put, take, takeEvery } from "redux-saga/effects";

import {
  getAction,
  ProcessingEnd,
  ProcessingStart,
} from "../../../../redux/util/util";
import { invokeApi } from "../../../../api/invokeApi";
import { setAllChats } from "../../../dashboard/redux/actions";
import { selectCurrentChat } from "../actions";

function* getNewDm(action) {
  try {
    ProcessingStart();
    const data = yield invokeApi("CREATE_NEW_CHAT_OR_RETRIVE", null, {
      receiverId: action.payload,
    });
    if (data) {
      yield put(selectCurrentChat(data.data.chatId));
      yield put(ProcessingEnd());
    }
  } catch (error) {
    console.error("Socket error:", error);
  }
}
function* getAllDm(action) {
  try {
    ProcessingStart();
    const data = yield invokeApi("GET_ALL_CHATS");
    if (data) {
      yield put(setAllChats(data.data));
      yield put(ProcessingEnd());
    }
  } catch (error) {
    console.error("Socket error:", error);
  }
}

function* chatSaga() {
  yield takeEvery("NEW_DM", getNewDm);
  yield takeEvery("GET_ALL_DM", getAllDm);
}

export default chatSaga;
