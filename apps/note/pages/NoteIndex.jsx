const { useState, useEffect } = React

import { noteService } from "../services/note.service.js"
import { NoteList } from "../cmps/NoteList.jsx"
import { NoteAdd } from "../cmps/NoteAdd.jsx"
import {
  showSuccessMsg,
  showErrorMsg,
} from "../../../services/event-bus.service.js"
export function NoteIndex() {
  const [notes, setNotes] = useState(null)

  useEffect(() => {
    loadNotes()
  }, [])

  function loadNotes() {
    noteService.query().then(setNotes)
  }

  function onRemoveNote(noteId) {
    noteService
      .remove(noteId)
      .then(() => {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId))
        showSuccessMsg(`note ${noteId} removed`)
      })
      .catch((err) => showErrorMsg(`Could not remove ${noteId}`))
  }

  function onAddNote(note) {
    noteService
      .save(note)
      .then((savedNote) => {
        setNotes((prevNotes) => [savedNote, ...prevNotes])
        showSuccessMsg("Note added")
      })
      .catch((err) => showErrorMsg("Cannot add note"))
  }

  if (!notes) return <div>Loading...</div>
  return (
    <section className="container">
      <NoteAdd onAddNote={onAddNote} />
      <NoteList notes={notes} onRemoveNote={onRemoveNote} />
    </section>
  )
}
