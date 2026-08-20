import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'
import { demoBooks } from '../books.js'

export const bookService = {
    query,
    getById,
    remove,
    save,
    addReview,
    removeReview,
    getNextBookId,
    addGoogleBook,
}

const BOOK_KEY = 'bookDB'

_createBooks()

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.title) {
                const regex = new RegExp(filterBy.title, 'i')
                books = books.filter(book => regex.test(book.title))
            }

            if (filterBy.maxPrice) {
                books = books.filter(book =>
                    book.listPrice.amount <= filterBy.maxPrice
                )
            }

            return books
        })
}

function getById(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function getNextBookId(bookId, diff) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            const bookIdx = books.findIndex(book => book.id === bookId)
            const nextBookIdx = (bookIdx + diff + books.length) % books.length

            return books[nextBookIdx].id
        })
}

function addReview(bookId, review) {
    return getById(bookId)
        .then(book => {
            const reviewToAdd = {
                id: utilService.makeId(),
                ...review,
            }

            book.reviews = book.reviews || []
            book.reviews.push(reviewToAdd)

            return storageService.put(BOOK_KEY, book)
        })
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)

    if (!books || !books.length) {
        books = demoBooks
        utilService.saveToStorage(BOOK_KEY, books)
    }
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    const bookToSave = {
        id: book.id || utilService.makeId(),
        title: book.title,
        thumbnail: book.thumbnail || 'BooksImages/1.jpg',
        listPrice: {
            amount: +book.price,
            currencyCode: 'EUR',
            isOnSale: false,
        },
    }

    if (bookToSave.id && book.id) {
        return storageService.put(BOOK_KEY, bookToSave)
    }

    return storageService.post(BOOK_KEY, bookToSave)
}

function removeReview(bookId, reviewId) {
    return getById(bookId)
        .then(book => {
            book.reviews = book.reviews.filter(
                review => review.id !== reviewId
            )

            return storageService.put(BOOK_KEY, book)
        })
}

function addGoogleBook(googleBook) {
    const book = {
        id: googleBook.id,
        title: googleBook.volumeInfo.title,
        subtitle: googleBook.volumeInfo.subtitle || '',
        authors: googleBook.volumeInfo.authors || [],
        publishedDate: googleBook.volumeInfo.publishedDate || '',
        description: googleBook.volumeInfo.description || '',
        pageCount: googleBook.volumeInfo.pageCount || 0,
        categories: googleBook.volumeInfo.categories || [],
        thumbnail: googleBook.volumeInfo.imageLinks
            ? googleBook.volumeInfo.imageLinks.thumbnail
            : 'BooksImages/1.jpg',
        language: googleBook.volumeInfo.language || 'en',
        listPrice: {
            amount: 0,
            currencyCode: 'USD',
            isOnSale: false,
        },
    }

    return storageService.query(BOOK_KEY)
        .then(books => {
            const isBookExists = books.some(book => book.id === googleBook.id)

            if (isBookExists) return

            return storageService.post(BOOK_KEY, book)
        })
}