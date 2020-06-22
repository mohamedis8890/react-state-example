import React, { useState, useContext } from "react";
import { v4 as uuidV4 } from "uuid";
import TodosContext from "./TodosContext";

export default function AddTodo() {
  const [task, setTask] = useState("");
  const dispatch = useContext(TodosContext);

  const handleChangeInput = event => {
    setTask(event.target.value);
  };

  const handleSubmit = event => {
    if (task) {
      dispatch({ type: "ADD_TODO", task, id: uuidV4() });
    }

    setTask("");

    event.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={task} onChange={handleChangeInput} />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
}
