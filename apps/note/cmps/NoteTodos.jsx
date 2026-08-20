export function NoteTodos({ info, isEditMode, onChangeInfo }) {
  const todos = info.todos || []

  function onToggleTodo(todoIdx) {
    const updatedTodos = todos.map((todo, idx) =>
      idx === todoIdx ? { ...todo, isDone: !todo.isDone } : todo,
    )
    onChangeInfo({ target: { name: "todos", value: updatedTodos } })
  }

  return (
    <div className="note-todos">
      <h3>{info.title}</h3>
      <ul>
        {todos.map((todo, idx) => (
          <li key={idx}>
            <label>
              <input
                type="checkbox"
                checked={todo.isDone}
                onChange={() => onToggleTodo(idx)}
              />
              <span className={todo.isDone ? "done" : ""}>{todo.txt}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}
