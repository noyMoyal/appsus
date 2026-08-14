const { useState, useEffect } = React



import { noteService } from '../services/note.service.js'
export function NoteIndex() {
        const [notes, setNotes] = useState(null)

    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes() {
        noteService.query().then(setNotes)
    }

    if (!notes) return <div>Loading...</div>
    return <section className="container">I have {notes.length} notes</section>
}

