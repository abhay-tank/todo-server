const uniqid = require("uniqid");
class Todo {
	constructor(todoContent) {
		this.todoId = uniqid();
		this.todoContent = todoContent;
		this.todoCompleted = false;
	}
}

module.exports = Todo;
