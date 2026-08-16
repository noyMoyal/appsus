import { NotePreview } from "./NotePreview.jsx"

export function NoteList({ notes, onRemoveNote, onUpdateNote }) {
  return (
    <section className="note-list">
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
           <NotePreview
              note={note}
              onUpdateNote={onUpdateNote}
              onRemoveNote={onRemoveNote}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
