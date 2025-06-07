export default function Todos({ todos, onHandleDelete }) {
  return (
    <ul>
      {todos.map((todo) => (
        <div style={{display: "flex", gap: "8px", alignItems: "center"}}>
        <input type="checkbox" name="done" id="done" />
          <li key={todo.id}>{todo.text}</li>
          <button onClick={() => onHandleDelete(todo.id)}>X</button>
        </div>
      ))}
    </ul>
  );
}
