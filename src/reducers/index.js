import { combineReducers } from "redux";
import { loginReducers } from "./login";

const allReducers = combineReducers({
  loginReducers,
});

export default allReducers;
