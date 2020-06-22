import React, { useReducer } from "react";
import "./styles.css";
import { v4 as uuidV4 } from "uuid";
import TodosContext from "./TodosContext";
import Filter from "./Filter";
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";

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

const todoReducer = (state, action) => {
  switch (action.type) {
    case "DO_TODO":
      return state.map(todo => {
        if (todo.id === action.id) {
          return { ...todo, complete: true };
        } else {
          return todo;
        }
      });

    case "UNDO_TODO":
      return state.map(todo => {
        if (todo.id === action.id) {
          return { ...todo, complete: false };
        } else {
          return todo;
        }
      });

    case "ADD_TODO":
      return state.concat({
        task: action.task,
        id: action.id,
        complete: false
      });

    default:
      throw new Error();
  }
};

export default function App() {
  const [todos, dispatchTodos] = useReducer(todoReducer, initalTodos);
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

  return (
    <TodosContext.Provider value={dispatchTodos}>
      <Filter dispatch={dispatchFilter} />
      <TodoList todos={filteredTodos} />
      <AddTodo />
    </TodosContext.Provider>
  );
}
