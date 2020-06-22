import React, { useContext } from "react";
import TodosContext from "./TodosContext";

export default function TodoItem({ todo }) {
  const dispatch = useContext(TodosContext);

  const handleChangeCheckbox = () => {
    dispatch({
      type: todo.complete ? "UNDO_TODO" : "DO_TODO",
      id: todo.id
    });
  };

  return (
    <li key={todo.id}>
      <label>
        <input
          type="checkbox"
          checked={todo.complete}
          onChange={handleChangeCheckbox}
        />
        {todo.task}
      </label>
    </li>
  );
}
