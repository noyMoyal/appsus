export function MailFolderList({ onSetFilter }) {
    return (
        <nav className="mail-folder-list">
            <button onClick={() => onSetFilter('inbox')}>
                Inbox
            </button>

            <button onClick={() => onSetFilter('sent')}>
                Sent
            </button>
        </nav>
    )
}