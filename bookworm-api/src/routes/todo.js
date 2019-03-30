import express from "express";
import request from "request-promise";
import { parseString } from "xml2js";
import authenticate from "../middleware/authenticate";
import Todo from "../models/Todo";
import parseErrors from "../utils/parseErrors";

const router = express.Router();
router.use(authenticate);

router.get("/", (req, res) => {
  Todo.find({ userEmail: req.body.userEmail })
	.then(todo => res.json({ todo }))
    .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
});

router.post("/", (req, res) => {
  Todo.create({ ...req.body.todo })
    .then(todo => res.json({ todo }))
    .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
});

router.post("/delete", (req, res) => {
  Todo.find({ id: req.body.todo.id })
	.remove()
    .then(todo => res.json({ }))
    .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
});

export default router;