export function BookPreview({ book }) {
    const { title, thumbnail, listPrice } = book

    return (
        <article className="book-preview">
            <img src={thumbnail} alt={title} />

            <h3>{title}</h3>

            <p>
                Price: {listPrice.amount} {listPrice.currencyCode}
            </p>

            {listPrice.isOnSale && <span>On Sale!</span>}
        </article>
    )
}