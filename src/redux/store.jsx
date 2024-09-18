import "regenerator-runtime/runtime";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSagas";
import { rootReducer } from "./rootReducer";

// // create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// // mount it on the Store
export const AppStore = configureStore({
  reducer: rootReducer,
  middleware: () => [sagaMiddleware],
});
sagaMiddleware.run(rootSaga);
