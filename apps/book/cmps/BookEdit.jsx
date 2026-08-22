const { useEffect, useRef, useState } = React

export function BookEdit({ isOpen, book, onClose, onSaveBook }) {
    const dialogRef = useRef()

    const [bookToEdit, setBookToEdit] = useState({
        title: '',
        price: '',
        thumbnail: '',
    })

    useEffect(() => {
        if (isOpen) {
            if (book) {
                setBookToEdit({
                    id: book.id,
                    title: book.title,
                    price: book.listPrice.amount,
                    thumbnail: book.thumbnail,
                })
            } else {
                setBookToEdit({
                    title: '',
                    price: '',
                    thumbnail: '',
                })
            }

            dialogRef.current.showModal()
        }
    }, [isOpen, book])

    function handleChange({ target }) {
        const { name, value } = target

        setBookToEdit(prevBook => ({
            ...prevBook,
            [name]: value,
        }))
    }

    function onSubmitBook(ev) {
        ev.preventDefault()

        onSaveBook(bookToEdit)

        setBookToEdit({
            title: '',
            price: '',
            thumbnail: '',
        })

        dialogRef.current.close()
        onClose()
    }

    function onCloseDialog() {
        dialogRef.current.close()
        onClose()
    }

    return (
        <dialog
            ref={dialogRef}
            className="book-edit"
            onClose={onClose}
        >
            <h2>{book ? 'Edit Book' : 'Add Book'}</h2>

            <form onSubmit={onSubmitBook}>
                <label htmlFor="title">Title:</label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    value={bookToEdit.title}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="price">Price:</label>
                <input
                    id="price"
                    name="price"
                    type="number"
                    value={bookToEdit.price}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="thumbnail">Image:</label>
                <input
                    id="thumbnail"
                    name="thumbnail"
                    type="text"
                    value={bookToEdit.thumbnail}
                    onChange={handleChange}
                />

                <button>Save</button>

                <button
                    type="button"
                    onClick={onCloseDialog}
                >
                    Close
                </button>
            </form>
        </dialog>
    )
}