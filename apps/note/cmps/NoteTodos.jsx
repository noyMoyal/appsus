export function NoteTodos({ info, isEditMode, onChangeInfo }) {
  const todos = info.todos || []

  function onToggleTodo(todoIdx) {
    const updatedTodos = todos.map((todo, idx) =>
      idx === todoIdx ? { ...todo, isDone: !todo.isDone } : todo,
    )
    onChangeInfo({ target: { name: "todos", value: updatedTodos } })
  }

  function onChangeTodoTxt(todoIdx, txt) {
    const updatedTodos = todos.map((todo, idx) =>
      idx === todoIdx ? { ...todo, txt } : todo,
    )
    onChangeInfo({ target: { name: "todos", value: updatedTodos } })
  }

  function onAddTodo() {
    const updatedTodos = [...todos, { txt: "", isDone: false }]
    onChangeInfo({ target: { name: "todos", value: updatedTodos } })
  }

  function onRemoveTodo(todoIdx) {
    const updatedTodos = todos.filter((todo, idx) => idx !== todoIdx)
    onChangeInfo({ target: { name: "todos", value: updatedTodos } })
  }

  if (isEditMode) {
    return (
      <div className="note-todos-edit">
        <input
          type="text"
          name="title"
          value={info.title}
          onChange={onChangeInfo}
          placeholder="Title"
        />
               {todos.map((todo, idx) => (
          <div className="todo-row" key={idx}>
            <input
              type="checkbox"
              checked={todo.isDone}
              onChange={() => onToggleTodo(idx)}
            />
            <input
              type="text"
              value={todo.txt}
              onChange={(ev) => onChangeTodoTxt(idx, ev.target.value)}
            />
            <button
              type="button"
              onClick={() => onRemoveTodo(idx)}
              aria-label="Remove item"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        ))}

        <button type="button" onClick={onAddTodo} className="add-todo">
          <i className="fa-solid fa-plus"></i> List item
        </button>
      </div>
    )
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
