import React, { useState } from "react";

import TodoDropdown from "./TodoDropdown";

export default function TodoSection(props) {
  const [showDropDown, setShowDropDown] = useState(false);

  const styles = {
    color: props.isTodoDone ? "rgb(160, 158, 158)" : "black",
    textDecoration: props.isTodoDone ? "line-through" : "",
  };

  const enter = () => {
    setShowDropDown(true);
  };

  const leave = () => {
    setShowDropDown(false);
  };

  return (
    <>
      <div className="todoContainer" onMouseEnter={enter} onMouseLeave={leave}>
        <div className="todo-section">
          <div
            onClick={() => props.doneTodoHandler(props.id)}
            className="checkbox-container"
          >
            <input
              type="checkbox"
              className="todoCheck"
              checked={props.isTodoDone}
              readOnly
            />
          </div>

          <div className="todo-text" style={styles}>
            {props.todoText}
          </div>
        </div>

        <div className="dropDown-menu">
          {showDropDown && (
            <TodoDropdown
              handleDeleteTodo={() => props.deleteTodoHandler(props.id)}
              handleEditTodo={() => props.editTodoHandler(props.id)}
              handleStarTodo={() => {
                props.starTodoHandler(props.id);
              }}
            />
          )}
        </div>
      </div>
    </>
  );
}
