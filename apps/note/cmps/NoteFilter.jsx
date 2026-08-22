const { useState, useEffect } = React

import { noteService } from "../services/note.service.js"

const TYPE_FILTERS = [
  { type: "", label: "All" },
  { type: "NoteTxt", label: "Text" },
  { type: "NoteImg", label: "Images" },
  { type: "NoteVideo", label: "Videos" },
  { type: "NoteTodos", label: "Todos" },
]

export function NoteFilter({ filterBy, onSetFilterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

  useEffect(() => {
    onSetFilterBy(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    const { name, value } = target
    setFilterByToEdit((prev) => ({ ...prev, [name]: value }))
  }

  function onSetType(type) {
    setFilterByToEdit((prev) => ({ ...prev, type }))
  }

  function onClearFilter() {
    setFilterByToEdit(noteService.getDefaultFilter())
  }

  return (
    <section className="note-filter">
      <div className="search-row">
        <i className="fa-solid fa-magnifying-glass"></i>

        <input
          type="text"
          name="txt"
          value={filterByToEdit.txt}
          onChange={handleChange}
          placeholder="Search"
        />

        {(filterByToEdit.txt || filterByToEdit.type) && (
          <button
            type="button"
            onClick={onClearFilter}
            aria-label="Clear search"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        )}
      </div>

      <div className="type-filter">
        {TYPE_FILTERS.map((btn) => (
          <button
            key={btn.type}
            type="button"
            className={filterByToEdit.type === btn.type ? "active" : ""}
            onClick={() => onSetType(btn.type)}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </section>
  )
}
