export function NoteImg({ info, isEditMode, onChangeInfo }) {
  if (isEditMode) {
    return (
      <div className="note-img-edit">
        <input
          type="text"
          name="url"
          value={info.url}
          onChange={onChangeInfo}
          placeholder="Image URL"
        />
        <input
          type="text"
          name="title"
          value={info.title}
          onChange={onChangeInfo}
          placeholder="Title"
        />
      </div>
    )
  }

  return (
    <div className="note-img">
      <img src={info.url} alt={info.title} />
      <h3>{info.title}</h3>
    </div>
  )
}