import { combineReducers } from "@reduxjs/toolkit";
import postReducer from "./reducers/posts";
import authReducer from "./reducers/auth";

const rootReducer = combineReducers({
  posts: postReducer,
  auth: authReducer,
});

//optional start
// export type RootState = ReturnType<typeof rootReducer>;
//optional end

export default rootReducer;
