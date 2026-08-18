const { useEffect, useState } = React
const { useNavigate } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'
import { MailList } from '../cmps/MailList.jsx'
import { MailFolderList } from '../cmps/MailFolderList.jsx'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailCompose } from '../cmps/MailCompose.jsx'
import {
    showSuccessMsg,
    showErrorMsg,
} from '../../../services/event-bus.service.js'

export function MailIndex() {
    const [mails, setMails] = useState(null)
    const [filterBy, setFilterBy] = useState({ status: 'inbox' })
    const [isComposeOpen, setIsComposeOpen] = useState(false)
    const [unreadCount, setUnreadCount] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        loadMails()
        loadUnreadCount()
    }, [filterBy])

    function loadMails() {
        mailService.query(filterBy)
            .then(mails => setMails(mails))
            .catch(err => {
                console.log('Cannot load mails:', err)
            })
    }

    function onSetFilter(filterByToEdit) {
        setFilterBy(prevFilter => ({
            ...prevFilter,
            ...filterByToEdit,
        }))
    }

    function onSelectMail(mail) {
        navigate(`/mail/${mail.id}?status=${filterBy.status}`)
    }

    function onRemoveMail(mailId) {
        const isTrash = filterBy.status === 'trash'

        const removePromise = isTrash
            ? mailService.removeForever(mailId)
            : mailService.remove(mailId)

        removePromise
            .then(() => {
                loadMails()
                loadUnreadCount()

                showSuccessMsg(
                    isTrash ? 'Mail deleted' : 'Mail moved to trash'
                )
            })
            .catch(err => {
                console.log('Cannot remove mail:', err)
                showErrorMsg('Cannot delete mail')
            })
    }

    function onOpenCompose() {
        setIsComposeOpen(true)
    }

    function onCloseCompose() {
        setIsComposeOpen(false)
        loadMails()
    }

    function loadUnreadCount() {
        mailService.getUnreadCount()
            .then(count => setUnreadCount(count))
            .catch(err => {
                console.log('Cannot load unread count:', err)
            })
    }

    if (!mails) return <div>Loading...</div>

    return (
        <section className="mail-index">
            <h1>MisterEmail</h1>

            <button onClick={onOpenCompose}>Compose</button>

            {isComposeOpen && (
                <MailCompose onClose={onCloseCompose} />
            )}

            <MailFolderList
                onSetFilter={onSetFilter}
                unreadCount={unreadCount}
            />

            <MailFilter onSetFilter={onSetFilter} />

            <MailList
                mails={mails}
                onSelectMail={onSelectMail}
                onRemoveMail={onRemoveMail}
            />

        </section>
    )
}