import { NotePreview } from "./NotePreview.jsx"
export function NoteList({ notes, onRemoveNote, onUpdateNote }) {
  return (
    <section className="note-list">
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <NotePreview note={note} onUpdateNote={onUpdateNote} />
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
