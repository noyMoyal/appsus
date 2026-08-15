const { useState } = React

import { NoteTxt } from "./NoteTxt.jsx"

export function NotePreview({ note, onUpdateNote }) {
  const [isEditMode, setIsEditMode] = useState(false)
  const [noteToEdit, setNoteToEdit] = useState(note)

  console.log("NotePreview render, isEditMode:", isEditMode)

  function onToggleEdit() {
     if (isEditMode) {
        onUpdateNote(noteToEdit)
    }
    setIsEditMode((prev) => !prev)
  }

  function onChangeInfo({ target }) {
    const { name, value } = target

    setNoteToEdit((prev) => ({
      ...prev,
      info: { ...prev.info, [name]: value },
    }))
  }
  return (
    <article className="note-preview">
      <NoteTxt
        info={noteToEdit.info}
        isEditMode={isEditMode}
        onChangeInfo={onChangeInfo}
      />

      <button onClick={onToggleEdit}>{isEditMode ? "Save" : "Edit"}</button>
    </article>
  )
}
