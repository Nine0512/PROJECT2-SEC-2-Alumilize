const getBook = async () => {
    try{
        const res = await fetch('http://localhost:5000/Book')
        const data = await res.json()
        return data
    }catch (err){
        console.log(err)
    }
}

const getBookById = async (id) => {
    try{
        const res = await fetch(`http://localhost:5000/Book/${id}`)
        const data = await res.json()
        return data
    }catch (err){
        console.log(err)
    }
}

const deleteBook = async (id) => {
    try{
        const res = await fetch(`http://localhost:5000/Book/${id}`, {
            method: 'DELETE'
        })
        const data = await res.json()
        return data
    }catch (err){
        console.log(err)
    }
}

export { getBook , getBookById, deleteBook }