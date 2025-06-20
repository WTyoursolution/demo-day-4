import { useEffect, useState } from "react";
import "./App.css";
import Todos from "./components/Todos";
import { createTodo, scanTodos, deleteTodo, toggleDone } from "./dynamo";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    async function getTodos() {
      const todoItems = await scanTodos();
      setTodos(todoItems);
    }
    getTodos();
  }, []);

async function handleToggle(todo) {
  const flipped = !todo.completed
  toggleDone(todo.id, flipped);
  setTodos((prev) => prev.map(item => (item.id === todo.id ? {...item, completed: flipped} : item )))
}

  async function handleDelete(id) {
    await deleteTodo(id);
    setTodos((prev) => prev.filter((item) => item.id != id));
  }

  async function handleAdd() {
    if (!text.trim()) return;
    const item = { id: crypto.randomUUID(), text, completed: false };
    await createTodo(item);
    setText("");
    setTodos((prev) => [...prev, item]);
  }

  return (
    <>
      <h1>Crud - App</h1>
      <label>
        <input
          value={text}
          type="text"
          name="todo"
          id="todo"
          onChange={(e) => setText(e.target.value)}
        />
      </label>
      <button onClick={handleAdd}>Add</button>
      <Todos 
      todos={todos} 
      onHandleDelete={handleDelete} 
      onHandleUpdate={handleToggle}
      />
    </>
  );
}

export default App;
