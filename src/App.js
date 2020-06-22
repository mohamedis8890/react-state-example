import React, { useState } from "react";
import "./styles.css";
import { v4 as uuidV4 } from "uuid";

const initalTodos = [
  {
    id: uuidV4(),
    task: "Learn React",
    complete: true
  },
  {
    id: uuidV4(),
    task: "Learn Firebase",
    complete: true
  },
  {
    id: uuidV4(),
    task: "Learn GraphQL",
    complete: false
  }
];

export default function App() {
  const [todos, setTodos] = useState(initalTodos);
  const [task, setTask] = useState("");

  const handleChangeCheckbox = id => {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          return { ...todo, complete: !todo.complete };
        } else {
          return todo;
        }
      })
    );
  };

  const handleChangeInput = event => {
    setTask(event.target.value);
  };

  const handleSubmit = event => {
    if (task) {
      setTodos(todos.concat({ id: uuidV4(), task, complete: false }));
    }

    setTask("");

    event.preventDefault();
  };
  return (
    <div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todo.complete}
                onChange={() => handleChangeCheckbox(todo.id)}
              />
              {todo.task}
            </label>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input type="text" value={task} onChange={handleChangeInput} />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
}
