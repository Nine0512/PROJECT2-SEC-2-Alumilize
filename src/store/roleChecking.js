import {defineStore, acceptHMRUpdate} from "pinia";
import {computed, ref} from "vue";

export const useRoleStore = defineStore("role", () => {
    const userInformation = ref({
        firstname: '',
        lastname: '',
        username: '',
        dateOfBirth: '',
        email: '',
        role: '',
        id: '',
        price: 0,
        cart: [],
        bookId: []
    })
    const setInfo = (userInfo) => {
        userInformation.value.firstname = userInfo.firstname
        userInformation.value.lastname = userInfo.lastname
        userInformation.value.username = userInfo.username
        userInformation.value.role = userInfo.role
        userInformation.value.dateOfBirth = userInfo.dateOfBirth
        userInformation.value.id = userInfo.id
        userInformation.value.email = userInfo.email
        userInformation.value.cart = userInfo.cart
        userInformation.value.bookId = userInfo.bookId
    }
    const setRole = (roleUser) => {
        userInformation.value.role = roleUser
    }
    const addToCart = (item) => {
        userInformation.value.cart.push(item)
    }
    const setCart = (Cart) => {
        userInformation.value.cart = Cart
     }
    const getPriceFromCart = computed(() => {
        return userInformation.value.cart.reduce((acc, cur) => acc + cur.price, 0)
    })
    const setBookId = (bookId) => {
        userInformation.value.bookId = bookId
    }
    const removeFromCart = (item) => {
       userInformation.value.cart = userInformation.value.cart.filter(e => e.id !== item.id)
    }

    return {userInformation, setCart, setInfo, setRole,addToCart ,getPriceFromCart,setBookId, removeFromCart}

})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useRoleStore, import.meta.hot))
}
