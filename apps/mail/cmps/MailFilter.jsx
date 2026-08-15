const { useState } = React

export function MailFilter({ onSetFilter }) {
    const [filterBy, setFilterBy] = useState({
        txt: '',
        isRead: 'all',
        sortBy: '',
    })

    function handleChange({ target }) {
        const { name, value } = target

        const newFilterBy = {
            ...filterBy,
            [name]: value,
        }

        setFilterBy(newFilterBy)
        onSetFilter(newFilterBy)
    }

    return (
        <section className="mail-filter">
            <input
                type="text"
                name="txt"
                placeholder="Search mail"
                value={filterBy.txt}
                onChange={handleChange}
            />

            <select
                name="isRead"
                value={filterBy.isRead}
                onChange={handleChange}
            >
                <option value="all">All</option>
                <option value="read">Read</option>
                <option value="unread">Unread</option>
            </select>

            <select
                name="sortBy"
                value={filterBy.sortBy}
                onChange={handleChange}
            >
                <option value="">Sort by</option>
                <option value="date">Date</option>
                <option value="subject">Subject</option>
            </select>

        </section>
    )
}