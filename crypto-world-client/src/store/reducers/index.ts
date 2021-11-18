import { combineReducers } from "redux";
import userReducer from "./user";

const allReducers = combineReducers({
  userReducer: userReducer,
});

export default allReducers;
