const { useState } = React

import { NoteTxt } from "./NoteTxt.jsx"

import { ColorPicker } from "./ColorPicker.jsx"

export function NotePreview({
  note,
  onUpdateNote,
  onRemoveNote,
  onDuplicateNote,
}) {
  const [isEditMode, setIsEditMode] = useState(false)
  const [noteToEdit, setNoteToEdit] = useState(note)
  const [isColorPickerShown, setIsColorPickerShown] = useState(false)

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

  function onSetStyle(style) {
    onUpdateNote({ ...note, style })
  }

  function onToggleColorPicker() {
    setIsColorPickerShown((prev) => !prev)
  }

  function onTogglePin() {
    onUpdateNote({ ...note, isPinned: !note.isPinned })
  }

  return (
    <article className="note-preview" style={note.style}>
      <NoteTxt
        info={noteToEdit.info}
        isEditMode={isEditMode}
        onChangeInfo={onChangeInfo}
      />

      <div className="actions" role="toolbar">
        <button onClick={onToggleEdit} aria-label="Edit note">
          {isEditMode ? "Save" : "Edit"}
        </button>

        <button onClick={() => onRemoveNote(note.id)} aria-label="Delete note">
          Delete
        </button>
        <button
          onClick={() => onDuplicateNote(note)}
          aria-label="Duplicate note"
        >
          Duplicate
        </button>

        <button
          onClick={onTogglePin}
          aria-label={note.isPinned ? "Unpin note" : "Pin note"}
        >
          <i className="fa-solid fa-thumbtack"></i>
        </button>
        <button onClick={onToggleColorPicker} aria-label="Change color">
          <i className="fa-solid fa-palette"></i>
        </button>
      </div>
      {isColorPickerShown && <ColorPicker onSetStyle={onSetStyle} />}
    </article>
  )
}
