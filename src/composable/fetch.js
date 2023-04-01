const getBook = async () => {
    try {
        const res = await fetch('http://localhost:5000/Book')
        if (res.status === 200) {
            const data = await res.json()
            return data
        }
    } catch (err) {
        console.log(err)
    }
}

const getBookById = async (id) => {
    try {
        const res = await fetch(`http://localhost:5000/Book/${id}`)
        if (res.status === 200) {
            const data = await res.json()
            return data
        }
    } catch (err) {
        console.log(err)
    }
}

const deleteBook = async (id) => {
    try {
        const res = await fetch(`http://localhost:5000/Book/${id}`, {
            method: 'DELETE'
        })
        if (res.status === 200) {
            const data = await res.json()
            return data
        }
    } catch (err) {
        console.log(err)
    }
}

const filterBook = async (filter, value) => {
    try {
        const res = await fetch(`http://localhost:5000/Book?${filter}=${value}`)
        if (res.status === 200) {
            const data = await res.json()
            return data
        }
    } catch (err) {
        console.log(err)
    }
}


export {getBook, getBookById, deleteBook , filterBook}