// note service

import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const NOTE_KEY = 'noteDB'
_createNotes()

export const noteService = {
    query,
    remove,
    save,
    getEmptyNote,
}

function query() {
    return storageService.query(NOTE_KEY)
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}

function getEmptyNote(txt = '') {
    return {
        createdAt: Date.now(),
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: '#ffffff'
        },
        info: {
            txt
        }
    }
}
// Private functions
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
                    backgroundColor: '#fff8b8'
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
                    backgroundColor: '#b4ddd3'
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
                    backgroundColor: '#f6e2dd'
                },
                info: {
                    txt: 'Big plans for the weekend: sleep in, finally watch that series everyone keeps talking about, maybe go to the beach if it is not too hot, and definitely not think about code even once'
                }

            },

            {
                id: 'n104',
                createdAt: 1112225,
                type: 'NoteImg',
                isPinned: false,
                style: {
                    backgroundColor: '#d3bfdb'
                },
                info: {
                    url: 'https://images.unsplash.com/photo-1786658054420-bbdcd866c2b9?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                    title: 'WOWWW'
                }
            },
            {
                id: 'n105',
                createdAt: 1112226,
                type: 'NoteImg',
                isPinned: false,
                style: {
                    backgroundColor: '#aeccdc'
                },
                info: {
                    url: 'https://plus.unsplash.com/premium_photo-1787081510925-be51987ddba3?q=80&w=1475&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                    title: 'Me and my code after the sprint'
                }

            },
            {
                id: 'n106',
                createdAt: 1112227,
                type: 'NoteVideo',
                isPinned: false,
                style: {
                    backgroundColor: '#e2f6d3'
                },
                info: {
                    url: 'https://www.youtube.com/embed/Ix5bViBnFDo',
                   title: "It's not a bug, it's a feature",
                }
            }
            
       ]

    utilService.saveToStorage(NOTE_KEY, notes)
}
    }
