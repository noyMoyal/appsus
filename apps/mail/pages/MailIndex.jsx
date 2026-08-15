const { useEffect, useState } = React

import { mailService } from '../services/mail.service.js'
import { MailList } from '../cmps/MailList.jsx'
import { MailFolderList } from '../cmps/MailFolderList.jsx'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailDetails } from './MailDetails.jsx'
import { MailCompose } from '../cmps/MailCompose.jsx'

export function MailIndex() {
    const [mails, setMails] = useState(null)
    const [filterBy, setFilterBy] = useState({ status: 'inbox' })
    const [selectedMail, setSelectedMail] = useState(null)
    const [isComposeOpen, setIsComposeOpen] = useState(false)
    const [unreadCount, setUnreadCount] = useState(0)

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
        if (mail.isRead) {
            setSelectedMail(mail)
            return
        }

        const mailToSave = {
            ...mail,
            isRead: true,
        }

        mailService.save(mailToSave)
            .then(savedMail => {
                setSelectedMail(savedMail)
                loadMails()
                loadUnreadCount()
            })
            .catch(err => {
                console.log('Cannot update mail:', err)
            })
    }

    function onBack() {
        setSelectedMail(null)
    }

    function onRemoveMail(mailId) {
        mailService.remove(mailId)
            .then(() => {
                loadMails()
                loadUnreadCount()
            })
            .catch(err => {
                console.log('Cannot remove mail:', err)
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

    if (selectedMail) {
        return <MailDetails mail={selectedMail} onBack={onBack} />
    }

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