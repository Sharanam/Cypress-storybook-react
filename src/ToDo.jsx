import { useState } from "react";
import "./ToDo.css";

export default function ToDo({ previousToDos = [] }) {
  const [todos, setTodos] = useState(previousToDos.length ? previousToDos : []);
  const [todo, setTodo] = useState("");
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (todo === "") return;
    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    };
    setTodos([...todos].concat(newTodo));
    setTodo("");
  }
  function deleteTodo(id) {
    const updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }
  function toggleComplete(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) todo.completed = !todo.completed;
      return todo;
    });
    setTodos(updatedTodos);
  }
  function editTodo(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) todo.text = editingText;
      return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);
    setEditingText("");
  }

  return (
    <div className="container">
      <h1 className="text-center">To Do List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setTodo(e.target.value)}
          placeholder="Enter a todo"
          value={todo}
        />
        <button type="submit">Add</button>
      </form>
      {todos.map((todo) => (
        <div key={todo.id}>
          {todoEditing === todo.id ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const id = todo.id;
                editTodo(id);
              }}
            >
              <input
                type="text"
                onChange={(e) => {
                  setEditingText(e.target.value);
                }}
                value={editingText}
                className="edit-input"
              />
            </form>
          ) : (
            <div className="todo">
              <div
                onClick={() => toggleComplete(todo.id)}
                className={todo.completed ? "completed" : "pending"}
              >
                {todo.text}
              </div>
              <button
                className="delete"
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </button>
              <button
                className="edit"
                onClick={() => {
                  setTodoEditing(todo.id);
                  setEditingText(todo.text);
                }}
              >
                Edit
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
