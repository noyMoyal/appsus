const { useEffect, useState } = React
const { useParams, Link } = ReactRouterDOM

import { LongTxt } from './LongTxt.jsx'
import { bookService } from '../services/book.service.js'
import { AddReview } from './AddReview.jsx'

export function BookDetails() {
    const [book, setBook] = useState(null)
    const { bookId } = useParams()
    const [nextBookId, setNextBookId] = useState(null)
    const [prevBookId, setPrevBookId] = useState(null)

    useEffect(() => {
        loadBook()

        bookService.getNextBookId(bookId, 1)
            .then(setNextBookId)

        bookService.getNextBookId(bookId, -1)
            .then(setPrevBookId)
    }, [bookId])

    function loadBook() {
        bookService.getById(bookId)
            .then(book => setBook(book))
            .catch(err => {
                console.log('Cannot load book:', err)
            })
    }

    function onRemoveReview(reviewId) {
        bookService.removeReview(bookId, reviewId)
            .then(updatedBook => {
                setBook(updatedBook)
            })
    }

    function getReadingLength(pageCount) {
        if (pageCount > 500) return 'Serious Reading'
        if (pageCount > 200) return 'Decent Reading'
        if (pageCount < 100) return 'Light Reading'

        return ''
    }

    function getBookAge(publishedDate) {
        const currentYear = new Date().getFullYear()
        const bookAge = currentYear - publishedDate

        if (bookAge > 10) return 'Vintage'
        if (bookAge < 1) return 'New!'

        return ''
    }

    function getPriceClass(amount) {
        if (amount > 150) return 'expensive'
        if (amount < 20) return 'cheap'

        return ''
    }

    if (!book) return <div>Loading...</div>

    return (
        <section className="book-details">
            <h2>Book Details</h2>

            <h3>{book.title}</h3>
            <h4>{book.subtitle}</h4>

            <img
                src={book.thumbnail}
                alt={book.title}
            />

            <p>Authors: {book.authors.join(', ')}</p>

            <p>Published: {book.publishedDate}</p>
            <p>{getBookAge(book.publishedDate)}</p>

            <p>Pages: {book.pageCount}</p>
            <p>{getReadingLength(book.pageCount)}</p>

            <p>Categories: {book.categories.join(', ')}</p>

            <p>Language: {book.language}</p>

            <LongTxt txt={book.description} />

            <p className={getPriceClass(book.listPrice.amount)}>
                Price: {book.listPrice.amount}{' '}
                {book.listPrice.currencyCode}
            </p>

            {book.listPrice.isOnSale && (
                <p className="on-sale">
                    On Sale!
                </p>
            )}

            <AddReview bookId={bookId} />
            {book.reviews && book.reviews.length > 0 && (
                <section className="review-list">
                    <h3>Reviews</h3>

                    {book.reviews.map(review => (
                        <article key={review.id}>
                            <p>Name: {review.fullname}</p>
                            <p>Rating: {review.rating}</p>
                            <p>Read at: {review.readAt}</p>

                            <button onClick={() => onRemoveReview(review.id)}>
                                Delete
                            </button>
                        </article>
                    ))}
                </section>
            )}

            {prevBookId && (
                <Link to={`/book/${prevBookId}`}>
                    Previous
                </Link>
            )}

            <span> | </span>

            {nextBookId && (
                <Link to={`/book/${nextBookId}`}>
                    Next
                </Link>
            )}

            <span> | </span>

            <Link to="/book">
                Back to books
            </Link>
        </section>
    )
}