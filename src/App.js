import React, { useState, useReducer } from "react";
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

const filterReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_ALL":
      return "ALL";

    case "SHOW_COMPLETE":
      return "COMPLETE";

    case "SHOW_INCOMPLETE":
      return "INCOMPLETE";
    default:
      throw new Error();
  }
};

export default function App() {
  const [todos, setTodos] = useState(initalTodos);
  const [task, setTask] = useState("");

  const [filter, dispatchFilter] = useReducer(filterReducer, "ALL");

  const filteredTodos = todos.filter(todo => {
    if (filter === "ALL") {
      return true;
    }

    if (filter === "COMPLETE" && todo.complete) {
      return true;
    }

    if (filter === "INCOMPLETE" && !todo.complete) {
      return true;
    }
    return false;
  });

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

  const handleShowAll = () => {
    dispatchFilter({ type: "SHOW_ALL" });
  };
  const handleShowComplete = () => {
    dispatchFilter({ type: "SHOW_COMPLETE" });
  };
  const handleShowIncomplete = () => {
    dispatchFilter({ type: "SHOW_INCOMPLETE" });
  };

  return (
    <div>
      <div>
        <button type="button" onClick={handleShowAll}>
          Show All
        </button>
        <button type="button" onClick={handleShowComplete}>
          Show Complete
        </button>
        <button type="button" onClick={handleShowIncomplete}>
          Show Incomplete
        </button>
      </div>
      <ul>
        {filteredTodos.map(todo => (
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
