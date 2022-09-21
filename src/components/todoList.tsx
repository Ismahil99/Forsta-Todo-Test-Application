import React, { useState } from "react";

type TodoListProps = {
  todos: any[];
  handleComplete: (x: string) => void;
  handleDelete: (x: string) => void;
  handleEdit: (x: string, y: string) => void;
};

export const TodoList = ({ todos, handleComplete, handleDelete, handleEdit }: TodoListProps) => {

  const [editing, setEditing] = useState("");

  const [input, setInput] = useState("");

  function trackEdit(x : string){
    if(editing === x){
      setEditing("");
    } else {
      setEditing(x);
      setInput("");
    };
  };

  const handleChangeEdit: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInput(e.currentTarget.value);
  }
 
  return (
    <ul className="todoList">
      {todos.map((item, i) => (
        <li key={i} className={item.done === true ? "todo_done" : ""} data-testid={`todo${i}`}>
          {
              editing === item.text ?
              <form onSubmit={(e: React.SyntheticEvent) => {
                e.preventDefault();
                handleEdit(item.text, input);
                setInput("");
                trackEdit(item.text);
              }}>
                <div className="todo_details">
                  <input 
                    type="text" 
                    placeholder={item.text} 
                    onChange={handleChangeEdit} 
                    required
                    data-testid={`todoEditInput${i}`}
                  />
                </div>

                <div className="todo_controls">
                  <button 
                    className="button_contol save"
                    type="submit"
                    data-testid={`todoEditSubmit${i}`}
                  />

                  <button 
                    className="button_contol cancel"
                    type="button"
                    onClick={()=> trackEdit(item.text)} 
                    data-testid={`todoEditCancel${i}`}
                  />
                </div>
              </ form>
              :
              <>
                <div className="todo_details">
                  <input 
                    type="checkbox"
                    onChange={()=> handleComplete(item.text)}
                    value={item.done}
                    checked={item.done}
                    data-testid={`toggle${i}`}
                  />
                  <span>
                    {item.text}
                  </span>
                </div>

                <div className="todo_controls">
                  <button 
                    className="button_contol edit"
                    onClick={()=> trackEdit(item.text)} 
                    data-testid={`todoEditStart${i}`}
                  />
                  <button 
                    className="button_contol delete"
                    onClick={()=> handleDelete(item.text)}
                    data-testid={`todoDelete${i}`}
                  />
                </div>
              </>
          }
        </li>
      ))}
    </ul>
  );
};
