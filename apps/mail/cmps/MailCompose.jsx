const { useState } = React

import { mailService } from '../services/mail.service.js'
import {
    showSuccessMsg,
    showErrorMsg,
} from '../../../services/event-bus.service.js'

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
                showSuccessMsg('Mail sent')
                onClose()
            })
            .catch(err => {
                showErrorMsg('Cannot send mail')
            })
    }

    function onSaveDraft() {
        if (!mail.to && !mail.subject && !mail.body) {
            onClose()
            return
        }

        mailService.saveDraft(mail)
            .then(() => {
                showSuccessMsg('Draft saved')
                onClose()
            })
            .catch(err => {
                showErrorMsg('Cannot save draft')
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
            <button onClick={onSaveDraft}>Cancel</button>
        </section>
    )
}