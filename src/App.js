import React, { useEffect, useState } from "react";

import "./Style/styles.css";

import { FiX, FiPlus } from "react-icons/fi";

import { v4 as uuidv4 } from "uuid";

import CreateNewTodos from "./Components/CreateNewTodos";
import TodoSection from "./Components/TodoSection";
import FilterTodo from "./Components/FilterTodo";

export default function App() {
  const [newTodo, setNewTodo] = useState(false);
  const [savedTodo, setSavedTodo] = useState(
    JSON.parse(localStorage.getItem("todoList"))
  );
  const [todos, setTodos] = useState(savedTodo || []);
  const [input, setInput] = useState({ inputText: "", filterTodo: "" });
  const [showTodo, setShowTodo] = useState(true);

  const yesterday = new Date().getDate() - 1;

  // when all todos are equal to yesterday
  const yesterdayTodo = todos.every(
    (todoElement) => todoElement.day === yesterday
  );
  // when all todos are equal to today
  const todayTodo = todos.every((todoElement) => todoElement.day !== yesterday);

  //saving todo
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todos));
    setSavedTodo(JSON.parse(localStorage.getItem("todoList")));

    if (todos.length === 0 || yesterdayTodo) {
      setNewTodo((prevState) => !prevState);
    }
  }, [todos, yesterday, yesterdayTodo]);

  // Handling todo input
  const changeHandler = (event) => {
    const { name, value } = event.target;
    setInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const clearInput = () => {
    setInput((prevInput) => ({ ...prevInput, inputText: "" }));
  };

  // creating new todo if there is no todos
  const createTodos = () => {
    setNewTodo((prevState) => !prevState);
  };

  // toggling today and yesterday todos
  const todoToggle = () => {
    setShowTodo((prevState) => !prevState);
  };

  //adding todo
  const addTodo = () => {
    setTodos((prevTodo) => [
      ...prevTodo,
      {
        todoText: input.inputText,
        id: uuidv4(),
        isTodoDone: false,
        isStar: false,
        day: new Date().getDate(),
      },
    ]);
    setInput((prevInput) => ({ ...prevInput, inputText: "" }));
  };

  //deleting todo
  const deleteTodo = (id) => {
    setTodos((prevTodo) => prevTodo.filter((todo) => todo.id !== id));
  };

  //editing todo
  const editTodo = (id) => {
    setTodos((prevTodo) =>
      prevTodo.filter((todo) =>
        todo.id === id
          ? setInput((prevInput) => ({
              ...prevInput,
              inputText: todo.todoText,
            }))
          : todo
      )
    );
  };

  //Complete todo
  const doneTodo = (id) => {
    setTodos((prevTodo) => {
      return prevTodo.map((todo) =>
        todo.id === id ? { ...todo, isTodoDone: !todo.isTodoDone } : todo
      );
    });
  };

  const starTodo = (id) => {
    setTodos((prevTodo) => {
      return prevTodo.map((todo) =>
        todo.id === id ? { ...todo, isStar: !todo.isStar } : todo
      );
    });
  };

  //maping through todoList and making component for each element of array

  const yesterdaysTodoElement = todos.map((todo) => {
    const todoElement = (
      <TodoSection key={todo.id} {...todo} deleteTodoHandler={deleteTodo} />
    );

    if (todo.day === yesterday) {
      switch (input.filterTodo) {
        case "completed":
          return todo.isTodoDone && todoElement;
        case "uncompleted":
          return !todo.isTodoDone && todoElement;
        case "morePriority":
          return todo.isStar && todoElement;
        case "lessPriority":
          return !todo.isStar && todoElement;

        default:
          return todoElement;
      }
    } else {
      return "";
    }
  });

  const todaysTodoElement = todos.map((todo) => {
    const todoElement = (
      <TodoSection
        key={todo.id}
        {...todo}
        deleteTodoHandler={deleteTodo}
        editTodoHandler={editTodo}
        doneTodoHandler={doneTodo}
        starTodoHandler={starTodo}
      />
    );
    if (todo.day !== yesterday) {
      switch (input.filterTodo) {
        case "completed":
          return todo.isTodoDone && todoElement;
        case "uncompleted":
          return !todo.isTodoDone && todoElement;
        case "morePriority":
          return todo.isStar && todoElement;
        case "lessPriority":
          return !todo.isStar && todoElement;

        default:
          return todoElement;
      }
    } else {
      return "";
    }
  });

  return (
    <>
      <main>
        {newTodo ? (
          <CreateNewTodos clickHandler={createTodos} />
        ) : (
          <div>
            {/* Input todo */}
            <div className="todoInput">
              <div>
                <input
                  type="text"
                  value={input.inputText}
                  name="inputText"
                  className="inputText"
                  onChange={changeHandler}
                />
              </div>
              <div className="todo-inputBtn">
                <button className="inputBtn clearBtn" onClick={clearInput}>
                  <FiX />
                </button>
                <button className="inputBtn addBtn" onClick={addTodo}>
                  <FiPlus />
                </button>
              </div>
            </div>

            {/* Output todo */}
            <div className="all-todos">
              <div className="toggle-content">
                <h2>{showTodo ? "Today" : "Yesterday"} </h2>

                <button onClick={todoToggle} className="toggle-todo">
                  {showTodo ? "Yesterday" : "today"}
                </button>
              </div>

              <div className="todos-content">
                <div className="yesterday-todos">
                  {todos.length > 0 && !todayTodo && !showTodo && (
                    <div className="todoOutput">{yesterdaysTodoElement}</div>
                  )}
                </div>

                {todos.length > 0 && !yesterdayTodo && showTodo && (
                  <div className="todays-todos">
                    <FilterTodo
                      value={input.filterTodo}
                      handleChange={changeHandler}
                    />
                    <div className="todoOutput">{todaysTodoElement} </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
