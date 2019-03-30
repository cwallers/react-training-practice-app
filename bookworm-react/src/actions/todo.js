import { normalize } from "normalizr";
import { TODO_FETCHED, TODO_CREATED, TODO_DELETED } from "../types";
import api from "../api";
import { todoSchema } from "../schemas";

// data.entities.todo
const todoFetched = data => ({
  type: TODO_FETCHED,
  data
});

const todoCreated = data => ({
  type: TODO_CREATED,
  data
});

const todoDeleted = data => ({
  type: TODO_DELETED,
  data
});

export const fetchTodo = email => dispatch =>
  api.todo
    .fetchAll(email)
    .then(todo => dispatch(todoFetched(normalize(todo, [todoSchema]))));

export const createTodo = data => dispatch =>
  api.todo
    .create(data)
    .then(todo => dispatch(todoCreated(normalize(todo, todoSchema))));
	
export const deleteTodo = data => dispatch =>
  api.todo
    .delete(data)
    .then(todo => dispatch(todoDeleted(normalize(todo, todoSchema))));
