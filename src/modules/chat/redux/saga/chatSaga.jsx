/* eslint-disable no-unused-vars */
import { call, fork, put, take, takeEvery } from "redux-saga/effects";

import {
  getAction,
  ProcessingEnd,
  ProcessingStart,
} from "../../../../redux/util/util";
import { invokeApi } from "../../../../api/invokeApi";
import { setAllMessages } from "../../../dashboard/redux/actions";
import { selectCurrentChat } from "../actions";
import { apiConstants } from "../../../../api/constants";
import { act } from "react";
import { create } from "storybook/internal/theming";

function* createNewChat(action) {
  try {
    ProcessingStart();
    const data = yield invokeApi(
      apiConstants.CREATE_NEW_CHAT_OR_RETRIVE,
      null,
      {
        receiverId: action.payload,
      }
    );
    if (data) {
      // eslint-disable-next-line no-debugger
      // debugger;
      yield put(selectCurrentChat(data.data.chatId));
      yield put(ProcessingEnd());
    }
  } catch (error) {
    console.error("Socket error:", error);
  }
}
function* getAllMessages(action) {
  try {
    ProcessingStart();
    const data = yield invokeApi(apiConstants.GET_ALL_CHATS);
    if (data) {
      yield put(setAllMessages(data.data));
      yield put(ProcessingEnd());
    }
  } catch (error) {
    console.error("Socket error:", error);
  }
}

function* sendMessage(action) {
  try {
    ProcessingStart();
    const payload = { ...action.payload, chatId: action.payload.chatId };
    // eslint-disable-next-line no-debugger
    debugger;
    const data = yield invokeApi(apiConstants.SEND_MESSAGE, payload);
    if (data) {
      // yield put(setAllChats(data.data));
      yield put(ProcessingEnd());
    }
  } catch (error) {
    console.error("Socket error:", error);
  }
}
function* chatSaga() {
  yield takeEvery("CREARE_NEW_CHAT", createNewChat);
  yield takeEvery("GET_ALL_MESSAGES", getAllMessages);
  yield takeEvery("SEND_MESSAGE", sendMessage);
}

export default chatSaga;
