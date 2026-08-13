export function MailPreview({ mail, onSelectMail, onRemoveMail }) {
    function onDelete(ev) {
        ev.stopPropagation()
        onRemoveMail(mail.id)
    }

    return (
        <article
            className="mail-preview"
            onClick={() => onSelectMail(mail)}
        >
            <h3>{mail.subject}</h3>
            <p>{mail.from}</p>
            <p>{mail.body}</p>

            <button onClick={onDelete}>Delete</button>
        </article>
    )
}