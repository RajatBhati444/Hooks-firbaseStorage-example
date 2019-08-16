import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import UseEffect from "./UseEffect";
import axios from "axios";

const Todo = () => {
  const [todoname, setTodoName] = useState("");
  const [todolist, setTodoList] = useState([]);

  const inputHandler = e => {
    setTodoName(e.target.value);
  };

  const todoAddHandler = () => {
    if (todoname == "") {
      alert("ef");
    } else {
      setTodoList(todolist.concat(todoname));
      setTodoName("");
    }
    axios
      .post("https://r-login-signup-auth.firebaseio.com/todos.json", {
        name: todoname
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get("https://r-login-signup-auth.firebaseio.com/todos.json")
      .then(result => {
        const todoData = result.data;
        const todos = [];
        console.log(todoData);
        for (const key in todoData) {
          todos.push({ id: key, name: todoData[key].name });
        }
        setTodoList(todos);
      });
  }, [todoname]);

  return (
    <React.Fragment>
      <input
        type="text"
        placeholder="todo..."
        onChange={inputHandler}
        value={todoname}
      />

      <button onClick={todoAddHandler} type="button">
        Add
      </button>
      <ul>
        {todolist.map(todo => (
          <li key={todo.id}> {todo.name} </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default Todo;
