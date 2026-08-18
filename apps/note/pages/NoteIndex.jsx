const { useState, useEffect } = React
const { useSearchParams } = ReactRouterDOM

import { noteService } from "../services/note.service.js"
import { NoteList } from "../cmps/NoteList.jsx"
import { NoteAdd } from "../cmps/NoteAdd.jsx"
import {
  showSuccessMsg,
  showErrorMsg,
} from "../../../services/event-bus.service.js"
export function NoteIndex() {
  const [notes, setNotes] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()

  const title = searchParams.get('title')
  const txt = searchParams.get('txt')

  useEffect(() => {
    loadNotes()
  }, [])

  useEffect(() => {
    if (!notes) return
    if (!title && !txt) return

    const noteTxt = `${title || ''}\n${txt || ''}`.trim()
    const note = noteService.getEmptyNote(noteTxt)
    
    note.style.backgroundColor = '#fff8b8'

    noteService.save(note)
      .then(savedNote => {
        setNotes(prevNotes => [savedNote, ...prevNotes])
        showSuccessMsg('Note added from mail')
        setSearchParams({})
      })
      .catch(err => {
        showErrorMsg('Cannot add note from mail')
      })
  }, [title, txt, notes])

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
      <NoteAdd onAddNote={onAddNote} />
      <NoteList
        notes={notes}
        onRemoveNote={onRemoveNote}
        onUpdateNote={onUpdateNote}
      />
    </section>
  )
}
