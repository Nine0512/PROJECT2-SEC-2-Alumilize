import {useRoleStore} from "@/store/roleChecking";
import router from "@/router";

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

let addBookToCart = async (event, price, role, userId, cart) => {
    let even = {id: parseInt(event.target.id), price: price}
    if (role === '') {
        await router.push('/login')
    } else if (!cart.some(item => item.id === even.id)) {
        useRoleStore().addToCart(even)
        await fetch(`http://localhost:5000/login/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    cart: cart
                }
            )
        })
    }
}


export {getBook, getBookById, deleteBook , filterBook, addBookToCart}