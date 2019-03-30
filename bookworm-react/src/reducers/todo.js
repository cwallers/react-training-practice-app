import { createSelector } from "reselect";
import { TODO_FETCHED, TODO_CREATED, TODO_DELETED } from "../types";

export default function todo(state = {}, action = {}) {
  switch (action.type) {
    case TODO_FETCHED:
    case TODO_CREATED:
    case TODO_DELETED:
      return { ...state, ...action.data.entities.todo };
    default:
      return state;
  }
}

// SELECTORS

export const todoSelector = state => state.todo;

export const allTodoSelector = createSelector(todoSelector, todoHash =>
  Object.values(todoHash)
);
