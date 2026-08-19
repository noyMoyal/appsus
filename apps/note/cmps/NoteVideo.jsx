export function NoteVideo({ info, isEditMode, onChangeInfo }) {
  if (isEditMode) {
    return (
      <div className="note-video-edit">
        <input
          type="text"
          name="url"
          value={info.url}
          onChange={onChangeInfo}
          placeholder="Video embed URL"
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
    <div className="note-video">
      <iframe src={info.url} frameBorder="0" allowFullScreen></iframe>
      <h3>{info.title}</h3>
    </div>
  )
}