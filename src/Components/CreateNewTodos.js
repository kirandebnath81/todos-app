import React from "react";

export default function CreateNewTodos(props) {
  return (
    <div className="newTodos">
      <h1>There is no todos for today</h1>
      <button className="newTodosBtn" onClick={props.clickHandler}>
        Create new todos
      </button>
    </div>
  );
}
