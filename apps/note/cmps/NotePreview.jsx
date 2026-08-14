const { useState } = React

import { NoteTxt } from "./NoteTxt.jsx"

export function NotePreview({ note }) {
  return (
    <article className="note-preview">
      <NoteTxt info={note.info} isEditMode={false} />
    </article>
  )
}
