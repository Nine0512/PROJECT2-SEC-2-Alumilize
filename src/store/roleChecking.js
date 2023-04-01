import {defineStore,acceptHMRUpdate} from "pinia";
import {computed, ref, watch} from "vue";

export const useRoleStore = defineStore("role", () => {
    const userInformation = ref({
        firstname: '',
        lastname: '',
        username: '',
        dateOfBirth: '',
        email: '',
        role: '',
        id:'',
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
        userInformation.value.price = userInfo.price
        userInformation.value.bookId = userInfo.bookId
    }
    const setRole= (roleUser) => {
        userInformation.value.role = roleUser
    }
    const setCartLength = () => {
        userInformation.value.cart = userInformation.value.cart.filter((item, index) => userInformation.value.cart.indexOf(item) === index)
    }

    const getLength = computed(() => {
        userInformation.value.cart.length
    })

    const getPrice = computed(() => {
    }
    )
    const setCart = (Cart) => {
        userInformation.value.cart = Cart
     }

    return {userInformation, setCart, setInfo, setRole,getLength,setCartLength, getPrice}
})
if(import.meta.hot){
    import.meta.hot.accept(acceptHMRUpdate(useRoleStore, import.meta.hot))
}
