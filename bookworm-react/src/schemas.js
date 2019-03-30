import { schema } from "normalizr";

export const bookSchema = new schema.Entity(
  "books",
  {},
  { idAttribute: "_id" }
);

export const todoSchema = new schema.Entity(
  "todo",
  {},
  { idAttribute: "_id" }
);
