export function MailFolderList({ onSetFilter, unreadCount, activeStatus }) {
    return (
        <nav className="mail-folder-list">
            <button
                className={activeStatus === 'inbox' ? 'active' : ''}
                onClick={() => onSetFilter({ status: 'inbox' })}
            >
                Inbox ({unreadCount})
            </button>

            <button
                className={activeStatus === 'sent' ? 'active' : ''}
                onClick={() => onSetFilter({ status: 'sent' })}
            >
                Sent
            </button>

            <button
                className={activeStatus === 'trash' ? 'active' : ''}
                onClick={() => onSetFilter({ status: 'trash' })}
            >
                Trash
            </button>

            <button
                className={activeStatus === 'draft' ? 'active' : ''}
                onClick={() => onSetFilter({ status: 'draft' })}
            >
                Drafts
            </button>
        </nav>
    )
}