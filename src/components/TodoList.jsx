import React, { useState } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleUpdate = (todo) => {
    const updateTodo = todos.filter((item) => item !== todo);
    setTodos(updateTodo);
  };

  return (
    <div className="">
      <h1>Hello World</h1>
      <div className="flex gap-2 justify-between w-112.5 m-auto mb-3">
        <input
          className="border border-black rounded-md px-3 py-1.5 w-full "
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a todo"
        />
        <button
          onClick={() => {
            if (inputValue.trim() !== "") {
              setTodos([...todos, inputValue]);
              setInputValue("");
            } else {
              alert("Please enter a valid todo");
            }
          }}
          className="border border-black rounded-md text-[18px] px-3 py-1"
        >
          Add
        </button>
      </div>
      <ul className="border relative border-black h-100 rounded-md w-112.5 m-auto p-5">
        {todos.map((todo) => (
          <div className="">
            <li className="border-b pb-0.5 " key={todo.id}>
              {todo}
            </li>
            <button
              onClick={() => handleUpdate(todo)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              ❌
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
