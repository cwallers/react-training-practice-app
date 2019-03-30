import { combineReducers } from "redux";

import user from "./reducers/user";
import books from "./reducers/books";
import todo from "./reducers/todo";

export default combineReducers({
  user,
  books,
  todo
});
