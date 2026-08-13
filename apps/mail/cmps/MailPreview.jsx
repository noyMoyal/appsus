export function MailPreview({ mail, onSelectMail }) {
    return (
        <article
            className="mail-preview"
            onClick={() => onSelectMail(mail)}
        >
            <h3>{mail.subject}</h3>
            <p>{mail.from}</p>
            <p>{mail.body}</p>
        </article>
    )
}