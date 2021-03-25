import { combineReducers } from "@reduxjs/toolkit";
import postReducer from "./reducers/posts";

const rootReducer = combineReducers({
  posts: postReducer,
});

//optional start
// export type RootState = ReturnType<typeof rootReducer>;
//optional end

export default rootReducer;
