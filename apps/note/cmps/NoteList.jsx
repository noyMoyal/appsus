export function NoteList({ notes, onRemoveNote }) {
  return (
    <section className="note-list">
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <p>{note.info.txt}</p>
            <button
              onClick={() => onRemoveNote(note.id)}
              className="btn-remove"
            >
              x
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
