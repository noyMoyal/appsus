export function MailFolderList({ onSetFilter, unreadCount }) {
    return (
        <nav className="mail-folder-list">
            <button onClick={() => onSetFilter({ status: 'inbox' })}>
                Inbox ({unreadCount})
            </button>

            <button onClick={() => onSetFilter({ status: 'sent' })}>
                Sent
            </button>

            <button onClick={() => onSetFilter({ status: 'trash' })}>
                Trash
            </button>
        </nav>
    )
}