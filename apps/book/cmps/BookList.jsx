const { Link } = ReactRouterDOM

import { BookPreview } from './BookPreview.jsx'

export function BookList({
    books,
    onRemoveBook,
    onEditBook,
}) {

    return (
        <ul className="book-list">
            {books.map(book => (
                <li key={book.id}>
                    <BookPreview book={book} />

                    <div className="book-actions">
                        <Link to={`/book/${book.id}`}>
                            <button className="details-btn">
                                Details
                            </button>
                        </Link>

                        <button
                            className="remove-btn"
                            onClick={() => onRemoveBook(book.id)}
                        >
                            Remove
                        </button>

                        <button
                            className="edit-btn"
                            onClick={() => onEditBook(book)}
                        >
                            Edit
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    )
}