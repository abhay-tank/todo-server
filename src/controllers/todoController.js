const dbs = require("../services/databaseService");

// GET
const getAllTodos = (req, res) => {
  console.log(dbs.db.data);
  res.send("getAllTodos");
};
// POST
const createTodo = (req, res) => {
  res.send("createTodo");
};
// GET:id
const getTodo = (req, res) => {
  res.send("getTodo");
};
// PATCH:id
const updateTodo = (req, res) => {
  res.send("updateTodo");
};
// DELETE:id
const deleteTodo = (req, res) => {
  res.send("deleteTodo");
};

module.exports = { getAllTodos, createTodo, getTodo, updateTodo, deleteTodo };
