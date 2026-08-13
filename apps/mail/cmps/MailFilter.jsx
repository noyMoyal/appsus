const { useState } = React

export function MailFilter({ onSetFilter }) {
    const [filterBy, setFilterBy] = useState({
        txt: '',
        isRead: 'all',
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
        </section>
    )
}