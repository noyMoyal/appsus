export function MailFolderList({ onSetFilter }) {
    return (
        <nav className="mail-folder-list">
            <button onClick={() => onSetFilter({ status: 'inbox' })}>
                Inbox
            </button>

            <button onClick={() => onSetFilter({ status: 'sent' })}>
                Sent
            </button>
        </nav>
    )
}