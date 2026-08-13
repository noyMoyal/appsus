const { useEffect, useState } = React

import { mailService } from '../services/mail.service.js'
import { MailList } from '../cmps/MailList.jsx'
import { MailFolderList } from '../cmps/MailFolderList.jsx'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailDetails } from './MailDetails.jsx'

export function MailIndex() {
    const [mails, setMails] = useState(null)
    const [filterBy, setFilterBy] = useState({ status: 'inbox' })
    const [selectedMail, setSelectedMail] = useState(null)

    useEffect(() => {
        loadMails()
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
            })
            .catch(err => {
                console.log('Cannot remove mail:', err)
            })
    }

    if (!mails) return <div>Loading...</div>

    if (selectedMail) {
        return <MailDetails mail={selectedMail} onBack={onBack} />
    }

    return (
        <section className="mail-index">
            <h1>MisterEmail</h1>

            <MailFolderList onSetFilter={onSetFilter} />
            <MailList
                mails={mails}
                onSelectMail={onSelectMail}
                onRemoveMail={onRemoveMail}
            />
            <MailFilter onSetFilter={onSetFilter} />

        </section>
    )
}