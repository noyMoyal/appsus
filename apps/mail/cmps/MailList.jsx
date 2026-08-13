import { MailPreview } from './MailPreview.jsx'

export function MailList({ mails, onSelectMail }) {
    return (
        <ul className="mail-list">
            {mails.map(mail => (
                <li key={mail.id}>
                    <MailPreview
                        mail={mail}
                        onSelectMail={onSelectMail}
                    />
                </li>
            ))}
        </ul>
    )
}
