import {defineStore,acceptHMRUpdate} from "pinia";
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
        cart: [],
        cartCheck: [],
        price: [],
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
        userInformation.value.cartCheck = userInfo.cartCheck
        userInformation.value.price = userInfo.price
        userInformation.value.bookId = userInfo.bookId
    }
    const setRole= (roleUser) => {
        userInformation.value.role = roleUser
    }
    const setCartLength = () => {
        userInformation.value.cart.filter((item, index) => userInformation.value.cart.indexOf(item) === index)
    }
    const getLength = computed(() => {
        userInformation.value.cart.length
    })
    const setCartToRemain = () => {
        userInformation.value.cart.filter(val => {
            if(userInformation.value.cartCheck === undefined){
                userInformation.value.cartCheck = []
            return userInformation.value.cartCheck.indexOf(val) === -1;
        }});
        // userInformation.value.cart.filter(val => !userInformation.value.cartCheck.includes(val));
    }
    return {userInformation, setCartToRemain, setInfo, setRole,getLength,setCartLength}
})
if(import.meta.hot){
    import.meta.hot.accept(acceptHMRUpdate(useRoleStore, import.meta.hot))
}