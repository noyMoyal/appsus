export function RateByStars({ val, onSelected }) {

    const stars = [1, 2, 3, 4, 5]

    return (
        <div className="rate-by-stars">
            {stars.map(star => (
                <span
                    key={star}
                    onClick={() => onSelected(star)}
                    style={{ cursor: 'pointer' }}
                >
                    {star <= val ? '★' : '☆'}
                </span>
            ))}
        </div>
    )
}