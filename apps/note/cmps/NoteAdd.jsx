const { useState } = React

import { noteService } from "../services/note.service.js"

export function NoteAdd({ onAddNote }) {
  const [noteToAdd, setNoteToAdd] = useState(noteService.getEmptyNote())

  function handleChange({ target }) {
    const { name, value } = target

    setNoteToAdd((prev) => ({
      ...prev,
      info: { ...prev.info, [name]: value },
    }))
  }

  function onSubmitNote(ev) {
    ev.preventDefault()
    if (!noteToAdd.info.txt) return

    onAddNote(noteToAdd)
    setNoteToAdd(noteService.getEmptyNote())
  }

  return (
    <form className="note-add" onSubmit={onSubmitNote}>
      <input
        type="text"
        name="txt"
        placeholder="Take a note..."
        value={noteToAdd.info.txt}
        onChange={handleChange}
      />
      <button>Add</button>
    </form>
  )
}
