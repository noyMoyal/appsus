export function MailDetails({ mail, onBack }) {
    return (
        <section className="mail-details">
            <button onClick={onBack}>Back</button>

            <h2>{mail.subject}</h2>

            <p>From: {mail.from}</p>
            <p>To: {mail.to}</p>

            <p>{mail.body}</p>
        </section>
    )
}