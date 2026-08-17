import { storageService } from '../../../services/async-storage.service.js'

export const mailService = {
    query,
    getById,
    save,
    remove,
    removeForever,
    add,
    getUnreadCount,
    getAdjacentMailId,
    saveDraft,
}

const MAIL_KEY = 'mailDB'

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus',
}

_createMails()

function _createMails() {
    let mails = JSON.parse(localStorage.getItem(MAIL_KEY))

    if (!mails || !mails.length) {
        mails = [
            {
                id: 'e101',
                createdAt: 1551133930500,
                subject: 'Miss you!',
                body: 'Would love to catch up sometimes',
                isRead: false,
                sentAt: 1551133930594,
                removedAt: null,
                from: 'momo@momo.com',
                to: loggedinUser.email,
            },
            {
                id: 'e102',
                createdAt: 1551133930600,
                subject: 'Sprint 3',
                body: 'Good luck with the Appsus sprint!',
                isRead: true,
                sentAt: 1551133930694,
                removedAt: null,
                from: loggedinUser.email,
                to: 'friend@appsus.com',
            },
            {
                id: 'e103',
                createdAt: 1551133930700,
                subject: 'Welcome to Appsus',
                body: 'This is your first email in MisterEmail.',
                isRead: false,
                sentAt: 1551133930794,
                removedAt: null,
                from: 'appsus@appsus.com',
                to: loggedinUser.email,
            },
        ]

        localStorage.setItem(MAIL_KEY, JSON.stringify(mails))
    }
}

function query(filterBy = {}) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.status === 'inbox') {
                mails = mails.filter(mail =>
                    mail.to === loggedinUser.email &&
                    !mail.removedAt
                )
            }

            if (filterBy.status === 'sent') {
                mails = mails.filter(mail =>
                    mail.from === loggedinUser.email &&
                    !mail.removedAt
                )
            }

            if (filterBy.status === 'trash') {
                mails = mails.filter(mail => mail.removedAt)
            }

            if (filterBy.status === 'draft') {
                mails = mails.filter(mail =>
                    mail.from === loggedinUser.email &&
                    !mail.sentAt &&
                    !mail.removedAt
                )
            }

            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')

                mails = mails.filter(mail =>
                    regex.test(mail.subject) ||
                    regex.test(mail.body) ||
                    regex.test(mail.from)
                )
            }

            if (filterBy.isRead === 'read') {
                mails = mails.filter(mail => mail.isRead)
            }

            if (filterBy.isRead === 'unread') {
                mails = mails.filter(mail => !mail.isRead)
            }

            if (filterBy.sortBy === 'date') {
                mails.sort((mail1, mail2) =>
                    mail2.sentAt - mail1.sentAt
                )
            }

            if (filterBy.sortBy === 'subject') {
                mails.sort((mail1, mail2) =>
                    mail1.subject.localeCompare(mail2.subject)
                )
            }

            return mails
        })
}

function getById(mailId) {
    return storageService.get(MAIL_KEY, mailId)
}

function save(mail) {
    return storageService.put(MAIL_KEY, mail)
}

function remove(mailId) {
    return getById(mailId)
        .then(mail => {
            const mailToSave = {
                ...mail,
                removedAt: Date.now(),
            }

            return save(mailToSave)
        })
}

function add(mail) {
    const mailToSave = {
        ...mail,
        createdAt: Date.now(),
        isRead: true,
        sentAt: Date.now(),
        removedAt: null,
        from: loggedinUser.email,
    }

    return storageService.post(MAIL_KEY, mailToSave)
}

function getUnreadCount() {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            return mails.filter(mail =>
                mail.to === loggedinUser.email &&
                !mail.isRead &&
                !mail.removedAt
            ).length
        })
}

function getAdjacentMailId(mailId, diff) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            const mailIdx = mails.findIndex(mail => mail.id === mailId)
            const adjacentMail = mails[mailIdx + diff]

            return adjacentMail ? adjacentMail.id : null
        })
}

function saveDraft(mail) {
    const draftToSave = {
        ...mail,
        createdAt: Date.now(),
        isRead: true,
        sentAt: null,
        removedAt: null,
        from: loggedinUser.email,
    }

    return storageService.post(MAIL_KEY, draftToSave)
}

function removeForever(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}