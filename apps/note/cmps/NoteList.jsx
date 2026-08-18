import { NotePreview } from "./NotePreview.jsx"

export function NoteList({
  notes,
  onRemoveNote,
  onUpdateNote,
  onDuplicateNote,
}) {
  const pinnedNotes = notes.filter((note) => note.isPinned)
  const otherNotes = notes.filter((note) => !note.isPinned)
  const sortedNotes = [...pinnedNotes, ...otherNotes]

  return (
    <section className="note-list">
      <ul>
        {sortedNotes.map((note) => (
          <li key={note.id}>
            <NotePreview
              note={note}
              onUpdateNote={onUpdateNote}
              onRemoveNote={onRemoveNote}
              onDuplicateNote={onDuplicateNote}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
