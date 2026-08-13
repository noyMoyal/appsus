import { storageService } from '../../../services/async-storage.service.js'

export const mailService = {
    query,
    getById,
    save,
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
                mails = mails.filter(mail => mail.to === loggedinUser.email)
            }

            if (filterBy.status === 'sent') {
                mails = mails.filter(mail => mail.from === loggedinUser.email)
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

            return mails
        })
}

function getById(mailId) {
    return storageService.get(MAIL_KEY, mailId)
}

function save(mail) {
    return storageService.put(MAIL_KEY, mail)
}