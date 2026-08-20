export const googleBookService = {
    query,
}

function query(txt = '') {
    return fetch('data/google-books.json')
        .then(res => res.json())
        .then(data => {
            let books = data.items

            if (txt) {
                const regex = new RegExp(txt, 'i')

                books = books.filter(book =>
                    regex.test(book.volumeInfo.title)
                )
            }

            return books
        })
}