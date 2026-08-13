const { useEffect, useState } = React

import { mailService } from '../services/mail.service.js'
import { MailList } from '../cmps/MailList.jsx'
import { MailFolderList } from '../cmps/MailFolderList.jsx'
import { MailFilter } from '../cmps/MailFilter.jsx'

export function MailIndex() {
    const [mails, setMails] = useState(null)
    const [filterBy, setFilterBy] = useState({ status: 'inbox' })

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

    if (!mails) return <div>Loading...</div>

    return (
        <section className="mail-index">
            <h1>MisterEmail</h1>

            <MailFolderList onSetFilter={onSetFilter} />
            <MailList mails={mails} />
            <MailFilter onSetFilter={onSetFilter} />

        </section>
    )
}