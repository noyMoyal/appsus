const { useState } = React

import { DynamicCmp } from "./DynamicCmp.jsx"
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

    if (!isEditMode) {
      onUpdateNote({ ...note, info: { ...note.info, [name]: value } })
      return
    }

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
      <DynamicCmp
        cmpType={note.type}
        info={isEditMode ? noteToEdit.info : note.info}
        isEditMode={isEditMode}
        onChangeInfo={onChangeInfo}
      />

      <div className="actions" role="toolbar">
        <button onClick={onToggleEdit} aria-label="Edit note">
          {isEditMode ? (
            <i className="fa-solid fa-check"></i>
          ) : (
            <i className="fa-solid fa-pen"></i>
          )}
        </button>

        <button onClick={() => onRemoveNote(note.id)} aria-label="Delete note">
          <i className="fa-solid fa-trash"></i>
        </button>
        <button
          onClick={() => onDuplicateNote(note)}
          aria-label="Duplicate note"
        >
          <i className="fa-solid fa-copy"></i>
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
