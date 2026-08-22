const { useEffect, useState } = React
const { useParams, useNavigate, useSearchParams } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'
import {
    showSuccessMsg,
    showErrorMsg,
} from '../../../services/event-bus.service.js'
export function MailDetails() {
    const [mail, setMail] = useState(null)
    const [nextMailId, setNextMailId] = useState(null)
    const [prevMailId, setPrevMailId] = useState(null)
    const { mailId } = useParams()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const status = searchParams.get('status')

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

    function onSaveAsNote() {
        const title = encodeURIComponent(mail.subject)
        const txt = encodeURIComponent(mail.body)

        navigate(`/note?title=${title}&txt=${txt}`)
    }

    function onRemoveMail() {
        const isTrash = status === 'trash'

        const removePromise = isTrash
            ? mailService.removeForever(mailId)
            : mailService.remove(mailId)

        removePromise
            .then(() => {
                showSuccessMsg(
                    isTrash ? 'Mail deleted' : 'Mail moved to trash'
                )
                navigate('/mail')
            })
            .catch(err => {
                console.log('Cannot remove mail:', err)
                showErrorMsg('Cannot delete mail')
            })
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

            <button onClick={onSaveAsNote}>
                Save as note
            </button>

            <button onClick={onRemoveMail}>
                Delete
            </button>

            <h2>{mail.subject}</h2>

            <p>From: {mail.from}</p>
            <p>To: {mail.to}</p>

            <p>{mail.body}</p>
        </section>
    )
}