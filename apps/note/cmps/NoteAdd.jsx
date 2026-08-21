const { useState } = React

import { noteService } from "../services/note.service.js"
import { DynamicCmp } from "./DynamicCmp.jsx"

const TYPE_BUTTONS = [
  { type: "NoteTxt", icon: "fa-solid fa-font", label: "Text note" },
  { type: "NoteImg", icon: "fa-solid fa-image", label: "Image note" },
  { type: "NoteVideo", icon: "fa-brands fa-youtube", label: "Video note" },
  { type: "NoteTodos", icon: "fa-regular fa-square-check", label: "Todos note" },
]

export function NoteAdd({ onAddNote }) {
  const [noteToAdd, setNoteToAdd] = useState(noteService.getEmptyNote())
  const [noteType, setNoteType] = useState("NoteTxt")
  const [isExpanded, setIsExpanded] = useState(false)

  function handleChange({ target }) {
    const { name, value } = target

    setNoteToAdd((prev) => ({
      ...prev,
      info: { ...prev.info, [name]: value },
    }))
  }

  function onChangeType(type) {
    setNoteType(type)
    setNoteToAdd(noteService.getEmptyNote(type))
    setIsExpanded(true)
  }

  function onSubmitNote(ev) {
    ev.preventDefault()

    const hasContent = Object.values(noteToAdd.info).some((val) => val.length)
    if (!hasContent) return

    onAddNote(noteToAdd)
    setNoteToAdd(noteService.getEmptyNote(noteType))
    setIsExpanded(false)
  }

  function TypePicker() {
    return (
      <div className="type-picker">
        {TYPE_BUTTONS.map((btn) => (
          <button
            key={btn.type}
            type="button"
            onClick={() => onChangeType(btn.type)}
            aria-label={btn.label}
          >
            <i className={btn.icon}></i>
          </button>
        ))}
      </div>
    )
  }

  if (!isExpanded) {
    return (
      <section className="note-add note-add-collapsed">
        <input
          type="text"
          placeholder="Take a note..."
          onFocus={() => setIsExpanded(true)}
          readOnly
        />
        <TypePicker />
      </section>
    )
  }

  return (
    <form className="note-add" onSubmit={onSubmitNote}>
      <DynamicCmp
        cmpType={noteType}
        info={noteToAdd.info}
        isEditMode={true}
        onChangeInfo={handleChange}
      />

      <div className="add-actions">
        <TypePicker />
        <button>Close</button>
      </div>
    </form>
  )
}