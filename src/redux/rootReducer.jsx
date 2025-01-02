import { combineReducers } from "redux";
import ApplicationReducer from "./appReducer";
import AuthReducer from "../modules/auth/redux/reducer";
import DashboardReducer from "../modules/dashboard/redux/reducer";
import GroupReducer from "../modules/groups/redux/reducer";
import ChatReducer from "../modules/chat/redux/reducer";

// Combine Reducers
export const rootReducer = combineReducers({
  ApplicationStates: ApplicationReducer,
  AuthStates: AuthReducer,
  DashboardStates: DashboardReducer,
  GroupsStates: GroupReducer,
  ChatStates: ChatReducer,
  // Add other reducers here if you have more
});
