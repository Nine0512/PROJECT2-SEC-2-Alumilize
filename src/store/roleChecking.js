import {defineStore} from "pinia";
import {computed, ref} from "vue";

export const useRoleStore = defineStore("role", () => {
    const userInformation = ref({
        firstname: '',
        lastname: '',
        username: '',
        dateOfBirth: '',
        email: '',
        role: '',
        id:'',
        bookId: [],
        cart: [],
        cartCheck: []
    })
    const setInfo = (userInfo) => {
        userInformation.value.firstname = userInfo.firstname
        userInformation.value.lastname = userInfo.lastname
        userInformation.value.username = userInfo.username
        userInformation.value.role = userInfo.role
        userInformation.value.dateOfBirth = userInfo.dateOfBirth
        userInformation.value.id = userInfo.id
        userInformation.value.email = userInfo.email
        userInformation.value.bookId = userInfo.bookId
        userInformation.value.cart = userInfo.cart
        userInformation.value.cartChecked = userInfo.cartCheck
    }
    const setRole= (roleUser) => {
        userInformation.value.role = roleUser
    }

    const setCartToEmpty = () => {
        userInformation.value.cart = []
    }

    return {userInformation, setCartToEmpty, setInfo, setRole}
})