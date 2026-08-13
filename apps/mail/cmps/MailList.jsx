export function MailList({ mails }) {
    return (
        <ul className="mail-list">
            {mails.map(mail => (
                <li key={mail.id}>
                    <h3>{mail.subject}</h3>
                    <p>{mail.from}</p>
                    <p>{mail.body}</p>
                </li>
            ))}
        </ul>
    )
}
