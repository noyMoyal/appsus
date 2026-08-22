export function BookFilter({ filterBy, onSetFilter }) {

    function handleChange({ target }) {
        const { name, value } = target

        onSetFilter({
            ...filterBy,
            [name]: value,
        })
    }

    return (
        <section className="book-filter">
            <h2>Filter Books</h2>

            <div className="filter-fields">
                <label htmlFor="title">
                    Title:
                </label>

                <input
                    id="title"
                    name="title"
                    type="text"
                    value={filterBy.title}
                    onChange={handleChange}
                />

                <label htmlFor="maxPrice">
                    Maximum price:
                </label>

                <input
                    id="maxPrice"
                    name="maxPrice"
                    type="number"
                    value={filterBy.maxPrice}
                    onChange={handleChange}
                />
            </div>
        </section>
    )
}