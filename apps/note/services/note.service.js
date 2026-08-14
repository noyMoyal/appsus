// note service

import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const NOTE_KEY = 'noteDB'
_createNotes()

export const noteService = {
    query,

}

function query() {
    return storageService.query(NOTE_KEY)
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)

    if (!notes || !notes.length) {
        notes = [
            {
                id: 'n101',
                createdAt: 1112222,
                type: 'NoteTxt',
                isPinned: true,
                style: {
                    backgroundColor: '#00d'
                },
                info: {
                    txt: 'Buy milk, coffee and something sweet'
                }
            },
            {
                id: 'n102',
                createdAt: 1112223,
                type: 'NoteTxt',
                isPinned: false,
                style: {
                    backgroundColor: '#0d0'
                },
                info: {
                    txt: 'Call mom back. Seriously this time.'
                }
            },
            {
                id: 'n103',
                createdAt: 1112224,
                type: 'NoteTxt',
                isPinned: false,
                style: {
                    backgroundColor: '#d00'
                },
                info: {
                    txt: 'Big plans for the weekend: sleep in, finally watch that series everyone keeps talking about, maybe go to the beach if it is not too hot, and definitely not think about code even once'
                }
            }
        ]

        utilService.saveToStorage(NOTE_KEY, notes)
    }
}