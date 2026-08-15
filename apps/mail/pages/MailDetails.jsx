const { useEffect, useState } = React
const { useParams, useNavigate } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'

export function MailDetails() {
    const [mail, setMail] = useState(null)
    const [nextMailId, setNextMailId] = useState(null)
    const [prevMailId, setPrevMailId] = useState(null)
    const { mailId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadMail()

        mailService.getAdjacentMailId(mailId, 1)
            .then(setNextMailId)

        mailService.getAdjacentMailId(mailId, -1)
            .then(setPrevMailId)
    }, [mailId])

    function loadMail() {
        mailService.getById(mailId)
            .then(mail => {
                if (!mail.isRead) {
                    const mailToSave = {
                        ...mail,
                        isRead: true,
                    }

                    return mailService.save(mailToSave)
                }

                return mail
            })
            .then(mail => {
                setMail(mail)
            })
            .catch(err => {
                console.log('Cannot load mail:', err)
            })
    }

    function onBack() {
        navigate('/mail')
    }

    if (!mail) return <div>Loading...</div>

    return (
        <section className="mail-details">
            <button onClick={onBack}>Back</button>

            {prevMailId && (
                <button onClick={() => navigate(`/mail/${prevMailId}`)}>
                    Previous
                </button>
            )}

            {nextMailId && (
                <button onClick={() => navigate(`/mail/${nextMailId}`)}>
                    Next
                </button>
            )}

            <h2>{mail.subject}</h2>

            <p>From: {mail.from}</p>
            <p>To: {mail.to}</p>

            <p>{mail.body}</p>
        </section>
    )
}