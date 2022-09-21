import React, { useState } from "react";
import { TodoList } from "./components/todoList";

import "./styles.scss";

export default function App() {

  const [todos, setTodos] = useState([
    { text: "Buy milk", done: true },
    { text: "Buy bread", done: false }
  ]);

  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  function handleComplete(x : string) {
    const newTodos = [];
    for(let i = 0; i < todos.length; i++){
      if(x === todos[i].text){
        newTodos.push({text: x, done: todos[i].done === false ? true : false});
      } else {
        newTodos.push(todos[i]);
      };
    };
    setTodos(newTodos);
  }

  function handleDelete(x : string){
    const newTodos = [];
    for(let i = 0; i < todos.length; i++){
      if(x !== todos[i].text){
        newTodos.push(todos[i]);
      };
    };
    setTodos(newTodos);
  }

  function handleEdit(x : string, y : string){
    const newTodos = [];
    for(let i = 0; i < todos.length; i++){
      if(x === todos[i].text){
        if(todos.some(e => e.text.toLowerCase() === y.toLowerCase())){
          setError("This Todo already exists in the list!");
          return
        } else {
          newTodos.push({text: y, done: todos[i].done});
        }
      } else {
        newTodos.push(todos[i]);
      };
    };
    setTodos(newTodos);
    setError("");
  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInput(e.currentTarget.value);
  }

  function handleSubmit(e: React.SyntheticEvent){
    e.preventDefault();
    if(todos.some(e => e.text.toLowerCase() === input.toLowerCase())){
      setError("This Todo already exists in the list!");
    } else {
      const newTodos = [ { text: input, done: false }, ...todos];
      setTodos(newTodos);
      setInput("");
      setError("");
    }
  }

  if(error !== ""){
		setTimeout(function () {
			setError("")
		}, 5000);
	}

  return (
    <div className="todoListApp">
      <div className="forsta-logo" />
      <TodoList todos={todos} handleDelete={handleDelete} handleComplete={handleComplete} handleEdit={handleEdit}/>

      <form onSubmit={handleSubmit} className="addTodo">
        <input type="text" value={input} onChange={handleChange} required data-testid="new-input"/>
        <button type="submit" data-testid="new-submit">Add Todo</button>
      </form>
      {
        error !== "" ?
        <div className="todo_error">
          <p>{error}</p>
        </div>
        : ""
      }
    </div>
  );
}
