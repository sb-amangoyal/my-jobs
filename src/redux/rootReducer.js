import { combineReducers } from "redux";
import userReducer from "./user/reducer";
import recruiterReducer from "./recruiter/reducer";
import candidateReducer from "./candidate/reducer";

const rootReducer = combineReducers({
  user: userReducer,
  recruiter: recruiterReducer,
  candidate: candidateReducer,
});

export default rootReducer;
