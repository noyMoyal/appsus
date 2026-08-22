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
        const now = Date.now()
        const day = 1000 * 60 * 60 * 24

        mails = [
            {
                id: 'e101',
                createdAt: now - day,
                subject: 'Miss you!',
                body: 'Would love to catch up sometime. Let me know when you are free.',
                isRead: false,
                sentAt: now - day,
                removedAt: null,
                from: 'momo@momo.com',
                to: loggedinUser.email,
            },
            {
                id: 'e102',
                createdAt: now - day * 2,
                subject: 'Sprint 3',
                body: 'Good luck with the Appsus sprint! The project is looking great.',
                isRead: true,
                sentAt: now - day * 2,
                removedAt: null,
                from: loggedinUser.email,
                to: 'friend@appsus.com',
            },
            {
                id: 'e103',
                createdAt: now - day * 3,
                subject: 'Welcome to Appsus',
                body: 'Welcome to MisterEmail. We hope you enjoy using the app.',
                isRead: false,
                sentAt: now - day * 3,
                removedAt: null,
                from: 'appsus@appsus.com',
                to: loggedinUser.email,
            },
            {
                id: 'e104',
                createdAt: now - day * 4,
                subject: 'Team meeting',
                body: 'Reminder: our team meeting is tomorrow at 10:00. See you there!',
                isRead: true,
                sentAt: now - day * 4,
                removedAt: null,
                from: 'team@appsus.com',
                to: loggedinUser.email,
            },
            {
                id: 'e105',
                createdAt: now - day * 5,
                subject: 'Project update',
                body: 'I finished my part of the project. Let me know if you need anything else.',
                isRead: true,
                sentAt: now - day * 5,
                removedAt: null,
                from: loggedinUser.email,
                to: 'noy@appsus.com',
            },
            {
                id: 'e106',
                createdAt: now - day * 6,
                subject: 'Weekend plans',
                body: 'Are you free this weekend? We can meet for coffee.',
                isRead: false,
                sentAt: now - day * 6,
                removedAt: null,
                from: 'dana@mail.com',
                to: loggedinUser.email,
            },
            {
                id: 'e107',
                createdAt: now - day * 7,
                subject: 'Your order has shipped',
                body: 'Your order is on the way and should arrive within three business days.',
                isRead: true,
                sentAt: now - day * 7,
                removedAt: null,
                from: 'shop@example.com',
                to: loggedinUser.email,
            },
            {
                id: 'e108',
                createdAt: now - day * 8,
                subject: 'Homework',
                body: 'Here are the homework instructions from today’s lesson.',
                isRead: false,
                sentAt: now - day * 8,
                removedAt: null,
                from: 'teacher@codingacademy.com',
                to: loggedinUser.email,
            },
            {
                id: 'e109',
                createdAt: now - day * 9,
                subject: 'Thank you',
                body: 'Thank you for your help yesterday. I really appreciate it.',
                isRead: true,
                sentAt: now - day * 9,
                removedAt: null,
                from: loggedinUser.email,
                to: 'student@mail.com',
            },
            {
                id: 'e110',
                createdAt: now - day * 10,
                subject: 'Monthly newsletter',
                body: 'Here are the latest updates, tips and news from Appsus.',
                isRead: false,
                sentAt: now - day * 10,
                removedAt: null,
                from: 'newsletter@appsus.com',
                to: loggedinUser.email,
            },
            {
                id: 'e111',
                createdAt: now - day * 11,
                subject: 'Lunch tomorrow?',
                body: 'Would you like to have lunch tomorrow? Let me know what time works for you.',
                isRead: true,
                sentAt: now - day * 11,
                removedAt: null,
                from: 'ron@mail.com',
                to: loggedinUser.email,
            },
            {
                id: 'e112',
                createdAt: now - day * 12,
                subject: 'See you soon',
                body: 'It was great talking to you. Hope to see you again soon!',
                isRead: true,
                sentAt: now - day * 12,
                removedAt: null,
                from: loggedinUser.email,
                to: 'momo@momo.com',
            },

            // Drafts
            {
                id: 'e113',
                createdAt: now - day * 2,
                subject: 'Sprint ideas',
                body: 'Maybe we should add more demo data and improve the design.',
                isRead: true,
                sentAt: null,
                removedAt: null,
                from: loggedinUser.email,
                to: 'noy@appsus.com',
            },
            {
                id: 'e114',
                createdAt: now - day * 4,
                subject: 'Meeting notes',
                body: 'Things to discuss in our next meeting...',
                isRead: true,
                sentAt: null,
                removedAt: null,
                from: loggedinUser.email,
                to: 'team@appsus.com',
            },

            // Trash
            {
                id: 'e115',
                createdAt: now - day * 15,
                subject: 'Special offer',
                body: 'This is an old promotional email that was moved to trash.',
                isRead: true,
                sentAt: now - day * 15,
                removedAt: now - day * 3,
                from: 'sales@example.com',
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