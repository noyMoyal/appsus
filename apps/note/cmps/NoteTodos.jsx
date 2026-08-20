export function NoteTodos({ info, isEditMode, onChangeInfo }) {
  const todos = info.todos || []

  return (
    <div className="note-todos">
      <h3>{info.title}</h3>
      <ul>
        {todos.map((todo, idx) => (
          <li key={idx}>{todo.txt}</li>
        ))}
      </ul>
    </div>
  )
}