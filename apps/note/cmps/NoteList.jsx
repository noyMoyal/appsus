export function NoteList({ notes }) {
    return <section className="note-list">
        <ul>
            {notes.map(note => <li key={note.id}>
                <p>{note.info.txt}</p>
            </li>)}
        </ul>
    </section>
}