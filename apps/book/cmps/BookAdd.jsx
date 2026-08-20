const { useState, useEffect } = React
const { useNavigate } = ReactRouterDOM

import { googleBookService } from '../services/google-book.service.js'
import { bookService } from '../services/book.service.js'
import { showSuccessMsg } from '../../../services/event-bus.service.js'

export function BookAdd() {
    const [books, setBooks] = useState([])
    const [filterBy, setFilterBy] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        googleBookService.query()
            .then(books => setBooks(books))
    }, [])

    function onSetFilter({ target }) {
        const value = target.value

        setFilterBy(value)

        googleBookService.query(value)
            .then(setBooks)
    }

    function onAddGoogleBook(book) {
        bookService.addGoogleBook(book)
            .then(() => {
                showSuccessMsg('Book added successfully')
                navigate('/book')
            })
    }

    return (
        <section className="book-add">
            <h2>Add Book</h2>

            <input
                type="text"
                placeholder="Search books..."
                value={filterBy}
                onChange={onSetFilter}
            />

            <ul>
                {books.map(book => (
                    <li key={book.id}>
                        {book.volumeInfo.title}

                        <button onClick={() => onAddGoogleBook(book)}>
                            +
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    )
}