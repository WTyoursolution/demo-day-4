export default function Todos({ todos, onHandleDelete, onHandleUpdate }) {
  const myStyles = { display: "flex", gap: "8px", alignItems: "center" }
  return (
    <ul>
      {todos.map((todo) => (
        <div
        key={todo.id}
        style={myStyles}
        >
        <input 
        onChange={() => onHandleUpdate(todo)}
        checked={todo.completed}
        type="checkbox" 
        name="done" 
        id="done" />
          <li style={{textDecoration: todo.completed ? "line-through" : "none"}}>{todo.text}</li>
          <button onClick={() => onHandleDelete(todo.id)}>X</button>
        </div>
      ))}
    </ul>
  );
}
