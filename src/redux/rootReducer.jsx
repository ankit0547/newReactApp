import { combineReducers } from "redux";
import ApplicationReducer from "./appReducer";
import AuthReducer from "../modules/auth/redux/reducer";

// Combine Reducers
export const rootReducer = combineReducers({
  ApplicationState: ApplicationReducer,
  AuthState: AuthReducer,
  // Add other reducers here if you have more
});
