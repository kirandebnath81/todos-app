import React from "react";

export default function FilterTodo(props) {
  return (
    <div>
      <select
        name="filterTodo"
        value={props.value}
        className="todays-filterTodo"
        onChange={props.handleChange}
      >
        <option value="">todos</option>
        <option value="completed">comepleted</option>
        <option value="uncompleted">uncompleted </option>
        <option value="morePriority">priority</option>
        <option value="lessPriority">inferiority</option>
      </select>
    </div>
  );
}
