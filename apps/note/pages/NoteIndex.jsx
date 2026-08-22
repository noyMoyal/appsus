const { useState, useEffect } = React
const { useSearchParams } = ReactRouterDOM

import { noteService } from "../services/note.service.js"
import { NoteList } from "../cmps/NoteList.jsx"
import { NoteAdd } from "../cmps/NoteAdd.jsx"
import { NoteFilter } from "../cmps/NoteFilter.jsx"
import {
  showSuccessMsg,
  showErrorMsg,
} from "../../../services/event-bus.service.js"
export function NoteIndex() {
  const [notes, setNotes] = useState(null)
  const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())
  const [searchParams, setSearchParams] = useSearchParams()

  const title = searchParams.get("title")
  const txt = searchParams.get("txt")

  useEffect(() => {
    loadNotes()
  }, [filterBy])

  useEffect(() => {
    if (!notes) return
    if (!title && !txt) return

    const noteTxt = `${title || ""}\n${txt || ""}`.trim()
    const note = noteService.getEmptyNote()
    note.info.txt = noteTxt

    note.style.backgroundColor = "#fff8b8"

    noteService
      .save(note)
      .then((savedNote) => {
        setNotes((prevNotes) => [savedNote, ...prevNotes])
        showSuccessMsg("Note added from mail")
        setSearchParams({})
      })
      .catch((err) => {
        showErrorMsg("Cannot add note from mail")
      })
  }, [title, txt, notes])

  function loadNotes() {
    noteService.query(filterBy).then(setNotes)
  }
  function onSetFilterBy(newFilter) {
    setFilterBy(newFilter)
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
  function onDuplicateNote(note) {
    const noteToDuplicate = {
      ...note,
      // no id, so save() creates a new note instead of overwriting
      id: undefined,
      createdAt: Date.now(),
      // separate copies, so editing one note won't change the other
      style: { ...note.style },
      info: { ...note.info },
    }
    noteService
      .save(noteToDuplicate)
      .then((savedNote) => {
        setNotes((prevNotes) => [savedNote, ...prevNotes])
        showSuccessMsg("Note duplicated")
      })
      .catch((err) => showErrorMsg("Cannot duplicate note"))
  }

  function onUpdateNote(noteToSave) {
    noteService
      .save(noteToSave)
      .then(() => {
        loadNotes()
        showSuccessMsg("Note updated")
      })
      .catch((err) => showErrorMsg("Cannot update note"))
  }

  if (!notes) return <div>Loading...</div>
  return (
    <section className="container">
      <NoteFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
      <NoteAdd onAddNote={onAddNote} />
      <NoteList
        notes={notes}
        onRemoveNote={onRemoveNote}
        onUpdateNote={onUpdateNote}
        onDuplicateNote={onDuplicateNote}
      />
    </section>
  )
}
