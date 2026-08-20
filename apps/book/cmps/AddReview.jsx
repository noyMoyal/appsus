const { useState } = React

import { bookService } from '../services/book.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'
import { RateBySelect } from './RateBySelect.jsx'
import { RateByTextbox } from './RateByTextbox.jsx'
import { RateByStars } from './RateByStars.jsx'

export function AddReview({ bookId }) {
    const [review, setReview] = useState({
        fullname: '',
        rating: 5,
        readAt: '',
    })

    const [rateBy, setRateBy] = useState('select')

    function handleChange({ target }) {
        const { name, value } = target

        setReview(prevReview => ({
            ...prevReview,
            [name]: value,
        }))
    }

    function onSetRating(rating) {
        setReview(prevReview => ({
            ...prevReview,
            rating,
        }))
    }

    function onSaveReview(ev) {
        ev.preventDefault()

        bookService.addReview(bookId, review)
            .then(() => {
                showSuccessMsg('Review added')

                setReview({
                    fullname: '',
                    rating: 5,
                    readAt: '',
                })
            })
            .catch(err => {
                console.log('Cannot add review:', err)
                showErrorMsg('Cannot add review')
            })
    }

    return (
        <form onSubmit={onSaveReview}>
            <h3>Add Review</h3>

            <label>Full name</label>
            <input
                type="text"
                name="fullname"
                value={review.fullname}
                onChange={handleChange}
            />

            <h4>Choose rating method</h4>

            <label>
                <input
                    type="radio"
                    name="rateBy"
                    value="select"
                    checked={rateBy === 'select'}
                    onChange={() => setRateBy('select')}
                />
                Select
            </label>

            <label>
                <input
                    type="radio"
                    name="rateBy"
                    value="textbox"
                    checked={rateBy === 'textbox'}
                    onChange={() => setRateBy('textbox')}
                />
                Textbox
            </label>

            <label>
                <input
                    type="radio"
                    name="rateBy"
                    value="stars"
                    checked={rateBy === 'stars'}
                    onChange={() => setRateBy('stars')}
                />
                Stars
            </label>

            {rateBy === 'select' && (
                <RateBySelect
                    val={review.rating}
                    onSelected={onSetRating}
                />
            )}

            {rateBy === 'textbox' && (
                <RateByTextbox
                    val={review.rating}
                    onSelected={onSetRating}
                />
            )}

            {rateBy === 'stars' && (
                <RateByStars
                    val={review.rating}
                    onSelected={onSetRating}
                />
            )}

            <label>Read at</label>
            <input
                type="date"
                name="readAt"
                value={review.readAt}
                onChange={handleChange}
            />

            <button>Save Review</button>
        </form>
    )
}