const { useEffect, useState } = React
const { Link, useSearchParams } = ReactRouterDOM

import { bookService } from '../services/book.service.js'
import { BookList } from '../cmps/BookList.jsx'
import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookDetails } from '../cmps/BookDetails.jsx'
import { BookEdit } from '../cmps/BookEdit.jsx'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

export function BookIndex() {

    const [searchParams, setSearchParams] = useSearchParams()
    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState({
        title: searchParams.get('title') || '',
        maxPrice: searchParams.get('maxPrice') || '',
    })

    const [isEditOpen, setIsEditOpen] = useState(false)
    const [bookToEdit, setBookToEdit] = useState(null)

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
            .then(books => setBooks(books))
    }
    function onSetFilter(filterBy) {
        setFilterBy(filterBy)

        setSearchParams({
            title: filterBy.title,
            maxPrice: filterBy.maxPrice,
        })
    }

    function onRemoveBook(bookId) {
        const isConfirmed = confirm('Are you sure you want to remove this book?')

        if (!isConfirmed) return

        bookService.remove(bookId)
            .then(() => {
                setBooks(prevBooks =>
                    prevBooks.filter(book => book.id !== bookId)
                )

                showSuccessMsg('Book removed successfully')
            })
            .catch(err => {
                console.log('Cannot remove book:', err)
                showErrorMsg('Cannot remove book')
            })
    }

    function onSaveBook(book) {
        bookService.save(book)
            .then(savedBook => {
                setBooks(prevBooks => {
                    const isEdit = prevBooks.some(book => book.id === savedBook.id)

                    if (isEdit) {
                        return prevBooks.map(book =>
                            book.id === savedBook.id ? savedBook : book
                        )
                    }

                    return [...prevBooks, savedBook]
                })

                setBookToEdit(null)

                showSuccessMsg('Book saved successfully')
            })
            .catch(err => {
                console.log('Cannot save book:', err)
                showErrorMsg('Cannot save book')
            })
    }

    function onAddBook() {
        setBookToEdit(null)
        setIsEditOpen(true)
    }

    function onEditBook(book) {
        setBookToEdit(book)
        setIsEditOpen(true)
    }

    if (!books) return <div>Loading...</div>

    return (
        <section className="book-index">
            <h2>Books</h2>

            <BookFilter
                filterBy={filterBy}
                onSetFilter={onSetFilter}
            />

            <button onClick={onAddBook}>
                Add Book
            </button>

            <span> | </span>

            <Link to="/book/add">
                Add from Google
            </Link>

            <span> | </span>

            <Link to="/book/dashboard">
                Dashboard
            </Link>

            <BookEdit
                isOpen={isEditOpen}
                book={bookToEdit}
                onClose={() => setIsEditOpen(false)}
                onSaveBook={onSaveBook}
            />

            <BookList
                books={books}
                onRemoveBook={onRemoveBook}
                onEditBook={onEditBook}
            />
        </section>
    )
}

