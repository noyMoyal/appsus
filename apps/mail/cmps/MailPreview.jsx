export function MailPreview({ mail }) {
    return (
        <article className="mail-preview">
            <h3>{mail.subject}</h3>
            <p>{mail.from}</p>
            <p>{mail.body}</p>
        </article>
    )
}