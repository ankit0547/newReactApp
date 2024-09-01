import { combineReducers } from "redux";
import counterReducer from "./reducers";
import AuthReducer from "../modules/auth/redux/reducer";

// Combine Reducers
export const rootReducer = combineReducers({
  ApplicationState: counterReducer,
  AuthenticationState: AuthReducer,
  // Add other reducers here if you have more
});
