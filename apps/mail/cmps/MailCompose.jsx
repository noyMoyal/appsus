const { useState } = React

import { mailService } from '../services/mail.service.js'

export function MailCompose({ onClose }) {
    const [mail, setMail] = useState({
        to: '',
        subject: '',
        body: '',
    })

    function handleChange({ target }) {
        const { name, value } = target

        setMail(prevMail => ({
            ...prevMail,
            [name]: value,
        }))
    }

    function onSendMail() {
        mailService.add(mail)
            .then(() => {
                onClose()
            })
            .catch(err => {
                console.log('Cannot send mail:', err)
            })
    }

    return (
        <section className="mail-compose">
            <h2>New Message</h2>

            <input
                type="email"
                name="to"
                placeholder="To"
                value={mail.to}
                onChange={handleChange}
            />

            <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={mail.subject}
                onChange={handleChange}
            />

            <textarea
                name="body"
                placeholder="Write your message..."
                value={mail.body}
                onChange={handleChange}
            />

            <button onClick={onSendMail}>Send</button>
            <button onClick={onClose}>Cancel</button>
        </section>
    )
}