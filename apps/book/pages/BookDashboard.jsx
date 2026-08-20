const { useEffect, useState } = React
const { Link } = ReactRouterDOM

import { bookService } from '../services/book.service.js'

export function BookDashboard() {
    const [books, setBooks] = useState(null)

    useEffect(() => {
        bookService.query()
            .then(books => setBooks(books))
    }, [])

    if (!books) return <div>Loading...</div>

    const booksPerCategory = books.reduce((acc, book) => {
        const categories = book.categories || ['Other']

        categories.forEach(category => {
            acc[category] = (acc[category] || 0) + 1
        })

        return acc
    }, {})

    const totalCategories = Object.values(booksPerCategory)
        .reduce((sum, count) => sum + count, 0)

    return (
        <section className="book-dashboard">
            <h2>Books Dashboard</h2>

            <p>Total books: {books.length}</p>

            <div className="dashboard-chart">
                {Object.entries(booksPerCategory).map(([category, count]) => {
                    const percentage = Math.round(
                        (count / totalCategories) * 100
                    )

                    return (
                        <div className="chart-item" key={category}>
                            <div
                                className="chart-bar"
                                style={{ height: `${percentage * 3}px` }}
                            >
                                {percentage}%
                            </div>

                            <p>{category}</p>
                        </div>
                    )
                })}
            </div>

            <Link to="/book">
                Back to books
            </Link>

        </section>
    )
}